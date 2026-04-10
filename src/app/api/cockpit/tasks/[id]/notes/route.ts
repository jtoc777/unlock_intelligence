import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { NOTE_AUTHORS, type TaskNoteInsert } from "@/lib/supabase/types";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("task_notes")
    .select("*")
    .eq("task_id", id)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServerClient();
  const body = (await request.json()) as Omit<TaskNoteInsert, "task_id">;

  if (!body.content?.trim()) {
    return NextResponse.json({ error: "content is required" }, { status: 400 });
  }

  if (!NOTE_AUTHORS.includes(body.author)) {
    return NextResponse.json(
      { error: `author must be one of: ${NOTE_AUTHORS.join(", ")}` },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("task_notes")
    .insert({
      task_id: id,
      author: body.author,
      content: body.content.trim(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
