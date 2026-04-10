import { createServerClient } from "@/lib/supabase/server";
import { TaskBoard } from "@/components/cockpit/task-board";
import type { Task } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function CockpitPage() {
  let tasks: Task[] = [];

  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });
    tasks = (data as Task[]) ?? [];
  } catch {
    // Supabase not configured yet — render empty board
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <TaskBoard initialTasks={tasks} />
    </div>
  );
}
