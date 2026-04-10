export const TASK_CATEGORIES = ["product", "curriculum", "business-gtm", "ops"] as const;
export const TASK_STATUSES = ["todo", "in-progress", "blocked", "at-risk", "postponed", "complete"] as const;
export const TASK_PRIORITIES = ["low", "medium", "high", "urgent"] as const;
export const TASK_OWNERS = ["shubham", "jt"] as const;

export type TaskCategory = (typeof TASK_CATEGORIES)[number];
export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];
export type TaskOwner = (typeof TASK_OWNERS)[number];

export const NOTE_AUTHORS = ["shubham", "jt", "claude"] as const;
export type NoteAuthor = (typeof NOTE_AUTHORS)[number];

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  owner: TaskOwner | null;
  due_date: string | null;
  link: string;
  created_at: string;
  updated_at: string;
}

export interface TaskNote {
  id: string;
  task_id: string;
  author: NoteAuthor;
  content: string;
  created_at: string;
}

export interface TaskInsert {
  title: string;
  description?: string;
  category: TaskCategory;
  status?: TaskStatus;
  priority?: TaskPriority;
  owner?: TaskOwner | null;
  due_date?: string | null;
  link?: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  category?: TaskCategory;
  status?: TaskStatus;
  priority?: TaskPriority;
  owner?: TaskOwner | null;
  due_date?: string | null;
  link?: string;
}

export interface TaskNoteInsert {
  task_id: string;
  author: NoteAuthor;
  content: string;
}

export const CATEGORY_LABELS: Record<TaskCategory, string> = {
  product: "Product",
  curriculum: "Curriculum",
  "business-gtm": "Business / GTM",
  ops: "Ops",
};

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  blocked: "Blocked",
  "at-risk": "At risk",
  postponed: "Postponed",
  complete: "Complete",
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export const OWNER_LABELS: Record<TaskOwner, string> = {
  shubham: "Shubham",
  jt: "JT",
};
