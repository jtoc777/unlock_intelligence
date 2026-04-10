"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import type { Task, TaskInsert } from "@/lib/supabase/types";
import {
  TASK_CATEGORIES,
  TASK_STATUSES,
  TASK_PRIORITIES,
  TASK_OWNERS,
  CATEGORY_LABELS,
  STATUS_LABELS,
  PRIORITY_LABELS,
  OWNER_LABELS,
} from "@/lib/supabase/types";

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
  onSuccess: () => void;
}

export function TaskForm({ open, onOpenChange, task, onSuccess }: TaskFormProps) {
  const isEditing = task !== null;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("product");
  const [status, setStatus] = useState<string>("todo");
  const [priority, setPriority] = useState<string>("medium");
  const [owner, setOwner] = useState<string>("unassigned");
  const [dueDate, setDueDate] = useState("");
  const [link, setLink] = useState("");

  // Reset form when opening with a task or fresh
  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      if (task) {
        setTitle(task.title);
        setDescription(task.description || "");
        setCategory(task.category);
        setStatus(task.status);
        setPriority(task.priority);
        setOwner(task.owner || "unassigned");
        setDueDate(task.due_date || "");
        setLink(task.link || "");
      } else {
        setTitle("");
        setDescription("");
        setCategory("product");
        setStatus("todo");
        setPriority("medium");
        setOwner("unassigned");
        setDueDate("");
        setLink("");
      }
      setError(null);
    }
    onOpenChange(isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setSaving(true);
    setError(null);

    const payload: TaskInsert = {
      title: title.trim(),
      description: description.trim(),
      category: category as TaskInsert["category"],
      status: status as TaskInsert["status"],
      priority: priority as TaskInsert["priority"],
      owner: owner === "unassigned" ? null : (owner as TaskInsert["owner"]),
      due_date: dueDate || null,
      link: link.trim() || "",
    };

    try {
      const url = isEditing
        ? `/api/cockpit/tasks/${task.id}`
        : "/api/cockpit/tasks";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong");
        return;
      }

      onSuccess();
    } catch {
      setError("Failed to save task");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{isEditing ? "Edit task" : "New task"}</SheetTitle>
          <SheetDescription>
            {isEditing
              ? "Update the task details below."
              : "Add a new task to the board."}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
          {error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="task-title">Title</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="task-description">Description</Label>
            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Additional details (optional)"
              rows={3}
              className="w-full min-w-0 rounded-lg border border-black/[0.06] bg-white px-3 py-2 text-sm text-[#1a1a2e] transition-colors outline-none placeholder:text-[#9ca3af] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => v && setCategory(v)}>
                <SelectTrigger size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {CATEGORY_LABELS[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => v && setStatus(v)}>
                <SelectTrigger size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(v) => v && setPriority(v)}>
                <SelectTrigger size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_PRIORITIES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {PRIORITY_LABELS[p]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Owner</Label>
              <Select value={owner} onValueChange={(v) => v && setOwner(v)}>
                <SelectTrigger size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {TASK_OWNERS.map((o) => (
                    <SelectItem key={o} value={o}>
                      {OWNER_LABELS[o]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="task-due-date">Due date</Label>
            <Input
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="task-link">Link (optional)</Label>
            <Input
              id="task-link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
            />
          </div>
        </form>

        <SheetFooter>
          <Button
            onClick={handleSubmit}
            disabled={saving}
            className="w-full"
          >
            {saving
              ? "Saving..."
              : isEditing
                ? "Save changes"
                : "Create task"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
