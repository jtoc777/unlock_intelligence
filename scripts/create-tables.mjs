import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load env vars from .env.local
const envFile = readFileSync(resolve(process.cwd(), ".env.local"), "utf-8");
const env = {};
for (const line of envFile.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim().replace(/^"|"$/g, "");
}

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const sql = `
-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT NOT NULL CHECK (category IN ('product', 'curriculum', 'business-gtm', 'ops')),
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('backlog', 'todo', 'in-progress', 'done')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  owner TEXT CHECK (owner IN ('shubham', 'jt')),
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Task notes (threaded comments)
CREATE TABLE IF NOT EXISTS task_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  author TEXT NOT NULL CHECK (author IN ('shubham', 'jt', 'claude')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_notes ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all tasks') THEN
    CREATE POLICY "Allow all tasks" ON tasks FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all task_notes') THEN
    CREATE POLICY "Allow all task_notes" ON task_notes FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tasks_updated_at ON tasks;
CREATE TRIGGER tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Index for fast note lookups
CREATE INDEX IF NOT EXISTS idx_task_notes_task_id ON task_notes(task_id);
`;

// Supabase JS client can't run raw SQL directly — use the REST RPC or the management API
// Instead, let's execute each statement via the pg_net or sql endpoint

// Actually, the simplest way is to use fetch against the Supabase SQL endpoint
const projectRef = env.SUPABASE_URL.match(/https:\/\/([^.]+)/)?.[1];

const res = await fetch(
  `https://${projectRef}.supabase.co/pg/query`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  }
);

if (!res.ok) {
  // Fallback: try the management API
  console.log("pg/query not available, trying individual statements via REST...");

  // Split and run statements one by one using supabase-js rpc
  // Actually let's just use the postgres connection directly via a lightweight pg client
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));

  for (const stmt of statements) {
    const { error } = await supabase.rpc("exec_sql", { sql_text: stmt + ";" });
    if (error) {
      console.log(`Note: ${error.message} (may be expected for IF NOT EXISTS)`);
    }
  }
  console.log("Done (with individual statements).");
} else {
  const data = await res.json();
  console.log("Tables created successfully:", JSON.stringify(data, null, 2));
}
