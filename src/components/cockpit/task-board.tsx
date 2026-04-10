"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  ExternalLink,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { TaskForm } from "@/components/cockpit/task-form";
import { TaskFilters } from "@/components/cockpit/task-filters";
import type {
  Task,
  TaskStatus,
  TaskCategory,
  TaskPriority,
  TaskOwner,
  TaskNote,
} from "@/lib/supabase/types";
import {
  STATUS_LABELS,
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  OWNER_LABELS,
  TASK_STATUSES,
} from "@/lib/supabase/types";

interface TaskBoardProps {
  initialTasks: Task[];
}

/* --- Color Maps --- */

const STATUS_COLORS: Record<TaskStatus, string> = {
  todo: "bg-[#E8EDF2] text-[#475569]",
  "in-progress": "bg-[#DBEAFE] text-[#1D4ED8]",
  blocked: "bg-[#FEE2E2] text-[#B91C1C]",
  "at-risk": "bg-[#FEF3C7] text-[#B45309]",
  postponed: "bg-[#F1F5F9] text-[#94A3B8]",
  complete: "bg-[#DCFCE7] text-[#15803D]",
};

const STATUS_DOT_COLORS: Record<TaskStatus, string> = {
  todo: "bg-[#94A3B8]",
  "in-progress": "bg-[#3B82F6]",
  blocked: "bg-[#EF4444]",
  "at-risk": "bg-[#F59E0B]",
  postponed: "bg-[#CBD5E1]",
  complete: "bg-[#22C55E]",
};

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  low: "bg-slate-100 text-slate-500",
  medium: "bg-slate-100 text-slate-600",
  high: "bg-amber-50 text-amber-700",
  urgent: "bg-red-50 text-red-700",
};

const CATEGORY_COLORS: Record<TaskCategory, string> = {
  product: "bg-[#DBEAFE] text-[#1E40AF]",
  curriculum: "bg-[#D1FAE5] text-[#065F46]",
  "business-gtm": "bg-[#FEF9C3] text-[#854D0E]",
  ops: "bg-[#F3E8FF] text-[#6B21A8]",
};

/* --- Author Styling --- */

const AUTHOR_COLORS: Record<string, string> = {
  shubham: "bg-indigo-500",
  jt: "bg-amber-500",
  claude: "bg-teal-500",
};

const AUTHOR_INITIALS: Record<string, string> = {
  shubham: "S",
  jt: "JT",
  claude: "C",
};

/* --- Sorting --- */

type SortKey = "status" | "priority" | "category" | "owner" | "due_date" | "title";
type SortDir = "asc" | "desc";

const STATUS_ORDER: Record<TaskStatus, number> = {
  "in-progress": 0,
  "at-risk": 1,
  blocked: 2,
  todo: 3,
  postponed: 4,
  complete: 5,
};

const PRIORITY_ORDER: Record<TaskPriority, number> = {
  urgent: 0,
  high: 1,
  medium: 2,
  low: 3,
};

function sortTasks(tasks: Task[], sortKey: SortKey, sortDir: SortDir): Task[] {
  return [...tasks].sort((a, b) => {
    let cmp = 0;
    switch (sortKey) {
      case "status":
        cmp = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
        break;
      case "priority":
        cmp = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        break;
      case "category":
        cmp = a.category.localeCompare(b.category);
        break;
      case "owner":
        cmp = (a.owner ?? "zzz").localeCompare(b.owner ?? "zzz");
        break;
      case "due_date":
        if (a.due_date && b.due_date) cmp = a.due_date.localeCompare(b.due_date);
        else if (a.due_date) cmp = -1;
        else if (b.due_date) cmp = 1;
        break;
      case "title":
        cmp = a.title.localeCompare(b.title);
        break;
    }
    return sortDir === "desc" ? -cmp : cmp;
  });
}

/* --- Helpers --- */

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDays === 1) return "yesterday";

  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/* --- Task Board --- */

export function TaskBoard({ initialTasks }: TaskBoardProps) {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("status");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [notesByTask, setNotesByTask] = useState<Record<string, TaskNote[]>>({});
  const [noteCountsByTask, setNoteCountsByTask] = useState<Record<string, number>>({});
  const [loadingNotes, setLoadingNotes] = useState<Record<string, boolean>>({});
  const [noteInput, setNoteInput] = useState("");
  const [sendingNote, setSendingNote] = useState(false);
  const [filters, setFilters] = useState<{
    status: TaskStatus | "all";
    category: TaskCategory | "all";
    owner: TaskOwner | "all";
    priority: TaskPriority | "all";
  }>({
    status: "all",
    category: "all",
    owner: "all",
    priority: "all",
  });

  const toggleSort = useCallback((key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }, [sortKey]);

  const filteredTasks = sortTasks(
    tasks.filter((t) => {
      if (filters.status !== "all" && t.status !== filters.status) return false;
      if (filters.category !== "all" && t.category !== filters.category)
        return false;
      if (filters.owner !== "all" && t.owner !== filters.owner) return false;
      if (filters.priority !== "all" && t.priority !== filters.priority)
        return false;
      return true;
    }),
    sortKey,
    sortDir,
  );

  // Realtime subscription — auto-updates when anyone changes tasks
  useEffect(() => {
    const channel = supabase
      .channel("cockpit-tasks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        () => {
          // Re-fetch all tasks on any change
          fetch("/api/cockpit/tasks")
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch(() => {});
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Fetch note counts for all tasks on mount
  useEffect(() => {
    async function fetchNoteCounts() {
      const counts: Record<string, number> = {};
      await Promise.all(
        tasks.map(async (task) => {
          try {
            const res = await fetch(`/api/cockpit/tasks/${task.id}/notes`);
            if (res.ok) {
              const notes: TaskNote[] = await res.json();
              counts[task.id] = notes.length;
            }
          } catch {
            // silent
          }
        }),
      );
      setNoteCountsByTask(counts);
    }
    if (tasks.length > 0) {
      fetchNoteCounts();
    }
  }, [tasks]);

  const refreshTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/cockpit/tasks");
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch {
      // silent fail — will show stale data
    }
  }, []);

  const updateStatus = useCallback(
    async (task: Task, newStatus: TaskStatus) => {
      // Optimistic update
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, status: newStatus } : t,
        ),
      );
      try {
        await fetch(`/api/cockpit/tasks/${task.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
      } catch {
        // Revert on failure
        setTasks((prev) =>
          prev.map((t) =>
            t.id === task.id ? { ...t, status: task.status } : t,
          ),
        );
      }
    },
    [],
  );

  const deleteTask = useCallback(
    async (task: Task) => {
      if (!window.confirm(`Delete "${task.title}"?`)) return;
      try {
        const res = await fetch(`/api/cockpit/tasks/${task.id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setTasks((prev) => prev.filter((t) => t.id !== task.id));
        }
      } catch {
        // silent fail
      }
    },
    [],
  );

  const handleFormSuccess = useCallback(() => {
    setFormOpen(false);
    setEditingTask(null);
    refreshTasks();
    router.refresh();
  }, [refreshTasks, router]);

  const openEdit = useCallback((task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  }, []);

  const openCreate = useCallback(() => {
    setEditingTask(null);
    setFormOpen(true);
  }, []);

  const toggleExpand = useCallback(async (taskId: string) => {
    if (expandedTaskId === taskId) {
      setExpandedTaskId(null);
      setNoteInput("");
      return;
    }
    setExpandedTaskId(taskId);
    setNoteInput("");

    // Fetch notes if not already loaded
    if (!notesByTask[taskId]) {
      setLoadingNotes((prev) => ({ ...prev, [taskId]: true }));
      try {
        const res = await fetch(`/api/cockpit/tasks/${taskId}/notes`);
        if (res.ok) {
          const data: TaskNote[] = await res.json();
          setNotesByTask((prev) => ({ ...prev, [taskId]: data }));
          setNoteCountsByTask((prev) => ({ ...prev, [taskId]: data.length }));
        }
      } catch {
        // silent
      } finally {
        setLoadingNotes((prev) => ({ ...prev, [taskId]: false }));
      }
    }
  }, [expandedTaskId, notesByTask]);

  const addNote = useCallback(async (taskId: string) => {
    if (!noteInput.trim() || sendingNote) return;
    setSendingNote(true);
    try {
      const res = await fetch(`/api/cockpit/tasks/${taskId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: "shubham", content: noteInput.trim() }),
      });
      if (res.ok) {
        const newNote: TaskNote = await res.json();
        setNotesByTask((prev) => ({
          ...prev,
          [taskId]: [...(prev[taskId] ?? []), newNote],
        }));
        setNoteCountsByTask((prev) => ({
          ...prev,
          [taskId]: (prev[taskId] ?? 0) + 1,
        }));
        setNoteInput("");
      }
    } catch {
      // silent
    } finally {
      setSendingNote(false);
    }
  }, [noteInput, sendingNote]);

  const counts = {
    total: tasks.length,
    active: tasks.filter((t) => t.status === "in-progress" || t.status === "at-risk").length,
    blocked: tasks.filter((t) => t.status === "blocked").length,
    complete: tasks.filter((t) => t.status === "complete").length,
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#1a1a2e]">Tasks</h1>
          <p className="mt-0.5 text-sm text-[#6b7280]">
            {counts.total} total &middot; {counts.active} active
            {counts.blocked > 0 && <> &middot; <span className="text-red-600">{counts.blocked} blocked</span></>}
            {" "}&middot; {counts.complete} complete
          </p>
        </div>
        <Button size="sm" onClick={openCreate}>
          <Plus data-icon="inline-start" />
          Add task
        </Button>
      </div>

      {/* Owner quick-toggle pills */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-[#94A3B8]">Quick filter:</span>
        {(["shubham", "jt"] as const).map((owner) => (
          <button
            key={owner}
            onClick={() => setFilters(prev => ({
              ...prev,
              owner: prev.owner === owner ? "all" : owner,
            }))}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              filters.owner === owner
                ? "bg-[#1a1a2e] text-white"
                : "bg-white text-[#64748B] border border-black/[0.06] hover:border-black/[0.12]",
            )}
          >
            {OWNER_LABELS[owner]}
          </button>
        ))}
      </div>

      {/* Filters */}
      <TaskFilters filters={filters} onChange={setFilters} />

      {/* Task table */}
      <div className="rounded-xl border border-black/[0.06] bg-white shadow-sm">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-sm text-[#6b7280]">
              {tasks.length === 0
                ? "No tasks yet. Add your first one."
                : "No tasks match the current filters."}
            </p>
            {tasks.length > 0 && (
              <button
                onClick={() => setFilters({ status: "all", category: "all", owner: "all", priority: "all" })}
                className="mt-3 rounded-full border border-black/[0.06] bg-white px-4 py-1.5 text-xs font-medium text-[#64748B] transition-colors hover:border-black/[0.12] hover:text-[#1a1a2e]"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Mobile card view */}
            <div className="space-y-px md:hidden">
              {filteredTasks.map((task) => {
                const isExpanded = expandedTaskId === task.id;
                const noteCount = noteCountsByTask[task.id] ?? 0;
                return (
                  <div
                    key={task.id}
                    className={cn(task.status === "complete" && "opacity-50")}
                  >
                    <div
                      className="flex items-start gap-3 border-b border-black/[0.04] p-4 last:border-0 cursor-pointer"
                      onClick={() => toggleExpand(task.id)}
                    >
                      <div
                        className="mt-0.5 shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <StatusDropdown
                          task={task}
                          onStatusChange={updateStatus}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-[#1a1a2e]">
                          {task.title}
                          {noteCount > 0 && (
                            <span className="ml-1.5 inline-flex items-center gap-0.5 text-[#9ca3af]">
                              <MessageSquare className="size-3" />
                              <span className="text-xs">{noteCount}</span>
                            </span>
                          )}
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          <Badge
                            className={CATEGORY_COLORS[task.category]}
                          >
                            {CATEGORY_LABELS[task.category]}
                          </Badge>
                          <Badge
                            className={PRIORITY_COLORS[task.priority]}
                          >
                            {PRIORITY_LABELS[task.priority]}
                          </Badge>
                          {task.owner && (
                            <Badge variant="outline" className="border-black/[0.06] text-[#6b7280]">
                              {OWNER_LABELS[task.owner]}
                            </Badge>
                          )}
                          {task.due_date && (
                            <span className="text-xs text-[#9ca3af]">
                              {new Date(task.due_date + "T00:00:00").toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button variant="ghost" size="icon-xs" />
                            }
                          >
                            <MoreHorizontal className="size-3.5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEdit(task)}>
                              <Pencil />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => deleteTask(task)}
                            >
                              <Trash2 />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    {isExpanded && (
                      <NotesThread
                        taskId={task.id}
                        notes={notesByTask[task.id] ?? []}
                        loading={loadingNotes[task.id] ?? false}
                        noteInput={noteInput}
                        onNoteInputChange={setNoteInput}
                        onAddNote={addNote}
                        sendingNote={sendingNote}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop table view */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="border-black/[0.06] hover:bg-transparent">
                    <TableHead className="w-[120px]">
                      <SortButton field="status" current={sortKey} dir={sortDir} onClick={toggleSort} label="Status" />
                    </TableHead>
                    <TableHead>
                      <SortButton field="title" current={sortKey} dir={sortDir} onClick={toggleSort} label="Task" />
                    </TableHead>
                    <TableHead>
                      <SortButton field="category" current={sortKey} dir={sortDir} onClick={toggleSort} label="Category" />
                    </TableHead>
                    <TableHead>
                      <SortButton field="priority" current={sortKey} dir={sortDir} onClick={toggleSort} label="Priority" />
                    </TableHead>
                    <TableHead>
                      <SortButton field="owner" current={sortKey} dir={sortDir} onClick={toggleSort} label="Owner" />
                    </TableHead>
                    <TableHead>
                      <SortButton field="due_date" current={sortKey} dir={sortDir} onClick={toggleSort} label="Due" />
                    </TableHead>
                    <TableHead className="w-8" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => {
                    const isExpanded = expandedTaskId === task.id;
                    const noteCount = noteCountsByTask[task.id] ?? 0;
                    return (
                      <TaskRowWithNotes
                        key={task.id}
                        task={task}
                        isExpanded={isExpanded}
                        noteCount={noteCount}
                        notes={notesByTask[task.id] ?? []}
                        loadingNotes={loadingNotes[task.id] ?? false}
                        noteInput={noteInput}
                        sendingNote={sendingNote}
                        onToggleExpand={toggleExpand}
                        onStatusChange={updateStatus}
                        onEdit={openEdit}
                        onDelete={deleteTask}
                        onNoteInputChange={setNoteInput}
                        onAddNote={addNote}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>

      {/* Task form sheet */}
      <TaskForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingTask(null);
        }}
        task={editingTask}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
}

/* ─── Status Dropdown ─── */

function StatusDropdown({
  task,
  onStatusChange,
}: {
  task: Task;
  onStatusChange: (task: Task, status: TaskStatus) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium transition-colors hover:ring-1 hover:ring-black/[0.08]",
              STATUS_COLORS[task.status],
            )}
          />
        }
      >
        <span className={cn("size-1.5 rounded-full", STATUS_DOT_COLORS[task.status])} />
        {STATUS_LABELS[task.status]}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={4}>
        {TASK_STATUSES.map((s) => (
          <DropdownMenuItem
            key={s}
            onClick={() => onStatusChange(task, s)}
            className={cn(
              s === task.status && "bg-black/[0.03]",
            )}
          >
            <span className={cn("size-2 rounded-full", STATUS_DOT_COLORS[s])} />
            {STATUS_LABELS[s]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ─── Desktop Table Row + Expandable Notes ─── */

interface TaskRowWithNotesProps {
  task: Task;
  isExpanded: boolean;
  noteCount: number;
  notes: TaskNote[];
  loadingNotes: boolean;
  noteInput: string;
  sendingNote: boolean;
  onToggleExpand: (taskId: string) => void;
  onStatusChange: (task: Task, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onNoteInputChange: (value: string) => void;
  onAddNote: (taskId: string) => void;
}

function TaskRowWithNotes({
  task,
  isExpanded,
  noteCount,
  notes,
  loadingNotes,
  noteInput,
  sendingNote,
  onToggleExpand,
  onStatusChange,
  onEdit,
  onDelete,
  onNoteInputChange,
  onAddNote,
}: TaskRowWithNotesProps) {
  return (
    <>
      <TableRow
        className={cn(
          "border-black/[0.04] cursor-pointer transition-colors",
          isExpanded ? "bg-[#f8f8fa]" : "hover:bg-[#f8f8fa]/60",
          task.status === "complete" && "opacity-50",
        )}
        onClick={() => onToggleExpand(task.id)}
      >
        <TableCell onClick={(e) => e.stopPropagation()}>
          <StatusDropdown task={task} onStatusChange={onStatusChange} />
        </TableCell>
        <TableCell>
          <div>
            <span className="font-medium text-[#1a1a2e]">
              {task.title}
              {task.link && (
                <a
                  href={task.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1.5 inline-flex align-middle text-[#9ca3af] transition-colors hover:text-[#6b7280]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="size-3" />
                </a>
              )}
              {noteCount > 0 && (
                <span className="ml-1.5 inline-flex items-center gap-0.5 text-[#9ca3af]">
                  <MessageSquare className="size-3" />
                  <span className="text-xs">{noteCount}</span>
                </span>
              )}
            </span>
            {task.description && (
              <p className="mt-0.5 max-w-md truncate text-xs text-[#9ca3af]">
                {task.description}
              </p>
            )}
          </div>
        </TableCell>
        <TableCell>
          <Badge
            className={CATEGORY_COLORS[task.category]}
          >
            {CATEGORY_LABELS[task.category]}
          </Badge>
        </TableCell>
        <TableCell>
          <Badge
            className={PRIORITY_COLORS[task.priority]}
          >
            {PRIORITY_LABELS[task.priority]}
          </Badge>
        </TableCell>
        <TableCell>
          {task.owner ? (
            <span className="text-sm text-[#6b7280]">
              {OWNER_LABELS[task.owner]}
            </span>
          ) : (
            <span className="text-sm text-[#9ca3af]">
              —
            </span>
          )}
        </TableCell>
        <TableCell>
          {task.due_date ? (
            <span className="text-sm text-[#6b7280]">
              {new Date(task.due_date + "T00:00:00").toLocaleDateString(
                "en-US",
                { month: "short", day: "numeric" },
              )}
            </span>
          ) : (
            <span className="text-sm text-[#9ca3af]">
              —
            </span>
          )}
        </TableCell>
        <TableCell onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon-xs" />
              }
            >
              <MoreHorizontal className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onEdit(task)}
              >
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => onDelete(task)}
              >
                <Trash2 />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow className="border-black/[0.04] hover:bg-transparent">
          <TableCell colSpan={7} className="p-0">
            <NotesThread
              taskId={task.id}
              notes={notes}
              loading={loadingNotes}
              noteInput={noteInput}
              onNoteInputChange={onNoteInputChange}
              onAddNote={onAddNote}
              sendingNote={sendingNote}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

/* ─── Notes Thread ─── */

interface NotesThreadProps {
  taskId: string;
  notes: TaskNote[];
  loading: boolean;
  noteInput: string;
  onNoteInputChange: (value: string) => void;
  onAddNote: (taskId: string) => void;
  sendingNote: boolean;
}

function NotesThread({
  taskId,
  notes,
  loading,
  noteInput,
  onNoteInputChange,
  onAddNote,
  sendingNote,
}: NotesThreadProps) {
  const reversedNotes = [...notes].reverse();

  return (
    <div className="border-t border-black/[0.04] bg-[#f8f8fa] px-6 py-4">
      {/* Add note input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={noteInput}
          onChange={(e) => onNoteInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onAddNote(taskId);
            }
          }}
          placeholder="Add a note..."
          className="flex-1 rounded-lg border border-black/[0.06] bg-white px-3 py-1.5 text-sm text-[#1a1a2e] placeholder:text-[#9ca3af] outline-none transition-colors focus:border-black/[0.12]"
          onClick={(e) => e.stopPropagation()}
        />
        <Button
          size="sm"
          variant="ghost"
          disabled={!noteInput.trim() || sendingNote}
          onClick={(e) => {
            e.stopPropagation();
            onAddNote(taskId);
          }}
          className="shrink-0 text-[#6b7280] hover:text-[#1a1a2e]"
        >
          <Send className="size-3.5" />
        </Button>
      </div>

      {/* Notes list */}
      {loading ? (
        <p className="mt-3 text-xs text-[#9ca3af]">Loading notes...</p>
      ) : reversedNotes.length === 0 ? (
        <p className="mt-3 text-xs text-[#9ca3af]">No notes yet</p>
      ) : (
        <div className="mt-3 space-y-2.5">
          {reversedNotes.map((note) => (
            <div key={note.id} className="flex items-start gap-2.5">
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white",
                  AUTHOR_COLORS[note.author] ?? "bg-gray-400",
                )}
              >
                {AUTHOR_INITIALS[note.author] ?? "?"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-[#1a1a2e]">{note.content}</p>
                <p className="mt-0.5 text-xs text-[#9ca3af]">
                  {relativeTime(note.created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Sort Button ─── */

function SortButton({
  field,
  current,
  dir,
  onClick,
  label,
}: {
  field: SortKey;
  current: SortKey;
  dir: SortDir;
  onClick: (key: SortKey) => void;
  label?: string;
}) {
  const active = current === field;
  const Icon = active ? (dir === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;
  return (
    <button
      onClick={() => onClick(field)}
      className={cn(
        "inline-flex items-center gap-1 text-xs transition-colors hover:text-[#1a1a2e]",
        active ? "text-[#1a1a2e]" : "text-[#9ca3af]",
      )}
    >
      {label && <span>{label}</span>}
      <Icon className="size-3" />
    </button>
  );
}
