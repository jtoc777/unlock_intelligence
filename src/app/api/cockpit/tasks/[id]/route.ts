import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import {
  TASK_CATEGORIES,
  TASK_STATUSES,
  TASK_PRIORITIES,
  TASK_OWNERS,
  type TaskUpdate,
} from "@/lib/supabase/types";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServerClient();
  const body = (await request.json()) as TaskUpdate;

  if (body.title !== undefined && !body.title.trim()) {
    return NextResponse.json({ error: "title cannot be empty" }, { status: 400 });
  }

  if (body.category && !TASK_CATEGORIES.includes(body.category)) {
    return NextResponse.json(
      { error: `category must be one of: ${TASK_CATEGORIES.join(", ")}` },
      { status: 400 },
    );
  }

  if (body.status && !TASK_STATUSES.includes(body.status)) {
    return NextResponse.json(
      { error: `status must be one of: ${TASK_STATUSES.join(", ")}` },
      { status: 400 },
    );
  }

  if (body.priority && !TASK_PRIORITIES.includes(body.priority)) {
    return NextResponse.json(
      { error: `priority must be one of: ${TASK_PRIORITIES.join(", ")}` },
      { status: 400 },
    );
  }

  if (body.owner !== undefined && body.owner !== null && !TASK_OWNERS.includes(body.owner)) {
    return NextResponse.json(
      { error: `owner must be one of: ${TASK_OWNERS.join(", ")}` },
      { status: 400 },
    );
  }

  const updates: Record<string, unknown> = {};
  if (body.title !== undefined) updates.title = body.title.trim();
  if (body.description !== undefined) updates.description = body.description;
  if (body.category !== undefined) updates.category = body.category;
  if (body.status !== undefined) updates.status = body.status;
  if (body.priority !== undefined) updates.priority = body.priority;
  if (body.owner !== undefined) updates.owner = body.owner;
  if (body.due_date !== undefined) updates.due_date = body.due_date;
  if (body.link !== undefined) updates.link = body.link;

  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "task not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServerClient();

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
