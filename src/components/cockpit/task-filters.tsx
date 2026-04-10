"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  TaskStatus,
  TaskCategory,
  TaskPriority,
  TaskOwner,
} from "@/lib/supabase/types";
import {
  TASK_STATUSES,
  TASK_CATEGORIES,
  TASK_PRIORITIES,
  TASK_OWNERS,
  STATUS_LABELS,
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  OWNER_LABELS,
} from "@/lib/supabase/types";

interface FilterState {
  status: TaskStatus | "all";
  category: TaskCategory | "all";
  owner: TaskOwner | "all";
  priority: TaskPriority | "all";
}

interface TaskFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function TaskFilters({ filters, onChange }: TaskFiltersProps) {
  const update = (key: keyof FilterState, value: string | null) => {
    onChange({ ...filters, [key]: value ?? "all" });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Select value={filters.status} onValueChange={(v) => update("status", v)}>
        <SelectTrigger size="sm" className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          {TASK_STATUSES.map((s) => (
            <SelectItem key={s} value={s}>
              {STATUS_LABELS[s]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.category}
        onValueChange={(v) => update("category", v)}
      >
        <SelectTrigger size="sm" className="w-[150px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {TASK_CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>
              {CATEGORY_LABELS[c]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.owner} onValueChange={(v) => update("owner", v)}>
        <SelectTrigger size="sm" className="w-[130px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Everyone</SelectItem>
          {TASK_OWNERS.map((o) => (
            <SelectItem key={o} value={o}>
              {OWNER_LABELS[o]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.priority}
        onValueChange={(v) => update("priority", v)}
      >
        <SelectTrigger size="sm" className="w-[130px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All priorities</SelectItem>
          {TASK_PRIORITIES.map((p) => (
            <SelectItem key={p} value={p}>
              {PRIORITY_LABELS[p]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
