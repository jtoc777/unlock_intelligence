import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import {
  TASK_CATEGORIES,
  TASK_STATUSES,
  TASK_PRIORITIES,
  TASK_OWNERS,
  type TaskInsert,
} from "@/lib/supabase/types";

export async function GET(request: NextRequest) {
  const supabase = createServerClient();
  const { searchParams } = request.nextUrl;

  let query = supabase.from("tasks").select("*");

  const status = searchParams.get("status");
  if (status) query = query.eq("status", status);

  const category = searchParams.get("category");
  if (category) query = query.eq("category", category);

  const owner = searchParams.get("owner");
  if (owner) query = query.eq("owner", owner);

  const priority = searchParams.get("priority");
  if (priority) query = query.eq("priority", priority);

  query = query.order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  const body = (await request.json()) as TaskInsert;

  if (!body.title?.trim()) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  if (!TASK_CATEGORIES.includes(body.category)) {
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

  if (body.owner && !TASK_OWNERS.includes(body.owner)) {
    return NextResponse.json(
      { error: `owner must be one of: ${TASK_OWNERS.join(", ")}` },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: body.title.trim(),
      description: body.description ?? "",
      category: body.category,
      status: body.status ?? "todo",
      priority: body.priority ?? "medium",
      owner: body.owner ?? null,
      due_date: body.due_date ?? null,
      link: body.link ?? "",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
