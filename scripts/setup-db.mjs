import pg from "pg";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local
const envFile = readFileSync(resolve(process.cwd(), ".env.local"), "utf-8");
const env = {};
for (const line of envFile.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim().replace(/^"|"$/g, "");
}

const client = new pg.Client({
  connectionString: env.POSTGRES_URL_NON_POOLING,
  ssl: { rejectUnauthorized: false },
});
await client.connect();
console.log("Connected to Supabase Postgres.");

// Create tables
await client.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    category TEXT NOT NULL CHECK (category IN ('product', 'curriculum', 'business-gtm', 'ops')),
    status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('backlog', 'todo', 'in-progress', 'done')),
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    owner TEXT CHECK (owner IN ('shubham', 'jt')),
    due_date DATE,
    link TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
  );
`);

// Add link column if table already existed without it
await client.query(`
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tasks' AND column_name='link') THEN
      ALTER TABLE tasks ADD COLUMN link TEXT DEFAULT '';
    END IF;
  END $$;
`);
console.log("✓ tasks table");

await client.query(`
  CREATE TABLE IF NOT EXISTS task_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    author TEXT NOT NULL CHECK (author IN ('shubham', 'jt', 'claude')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
  );
`);
console.log("✓ task_notes table");

// RLS
await client.query(`ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;`);
await client.query(`ALTER TABLE task_notes ENABLE ROW LEVEL SECURITY;`);

// Policies (idempotent)
await client.query(`
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all tasks') THEN
      CREATE POLICY "Allow all tasks" ON tasks FOR ALL USING (true) WITH CHECK (true);
    END IF;
  END $$;
`);
await client.query(`
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all task_notes') THEN
      CREATE POLICY "Allow all task_notes" ON task_notes FOR ALL USING (true) WITH CHECK (true);
    END IF;
  END $$;
`);
console.log("✓ RLS policies");

// Auto-update trigger
await client.query(`
  CREATE OR REPLACE FUNCTION update_updated_at()
  RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql;
`);
await client.query(`DROP TRIGGER IF EXISTS tasks_updated_at ON tasks;`);
await client.query(`
  CREATE TRIGGER tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
`);
console.log("✓ updated_at trigger");

// Index
await client.query(`CREATE INDEX IF NOT EXISTS idx_task_notes_task_id ON task_notes(task_id);`);
console.log("✓ indexes");

// Seed tasks
const seeds = [
  // CURRICULUM — from beta-todo.md (April 12 demo prep)
  { title: "Text Bill McCue for a specific prospect name", category: "curriculum", priority: "urgent", owner: "shubham", status: "todo", description: "Need a company he's selling TO (not Workday). Public web presence needed for the scraper closer demo." },
  { title: "Confirm projector setup with JT", category: "curriculum", priority: "urgent", owner: "jt", status: "todo", description: "HDMI or USB-C at 1 West Superior for Sunday demo." },
  { title: "Decide demo path based on Jess's response", category: "curriculum", priority: "urgent", owner: "shubham", status: "todo", description: "If dummy account: create Google account + pre-populate 3 meetings. If live OAuth: confirm her laptop allows it." },
  { title: "Pre-build the deliberate failure prompt", category: "curriculum", priority: "high", owner: "shubham", status: "todo", description: "Cannabis licensing or 280E ruling prompt for Zeshawn's domain. Test, confirm it fabricates, save in a tab." },
  { title: "Script opening 15 seconds + closer bridge line", category: "curriculum", priority: "high", owner: "shubham", status: "todo", description: "Memorize first two sentences and the closer: 'The distance between one step and six steps is not talent…'" },
  { title: "Copy 5 starter Projects into shared Google Doc", category: "curriculum", priority: "urgent", owner: "shubham", status: "todo", description: "Saturday heavy prep. Paste each starter under attendee's real name. Order: Zeshawn, Alan, Tommy, Jess, Bill." },
  { title: "Dry-run volunteer demo on Jess's calendar", category: "curriculum", priority: "urgent", owner: "shubham", status: "todo", description: "Non-negotiable. Feel the OAuth flow, time the prompt run, judge output quality. Fall back to Plan B/C if mediocre." },
  { title: "Build Gamma artifacts for demo", category: "curriculum", priority: "high", owner: "shubham", status: "todo", description: "Matrix visual for projecting + designed worksheet for printing." },
  { title: "Get building access / parking instructions from JT", category: "curriculum", priority: "medium", owner: "jt", status: "todo", description: "For the pre-class setup doc — 1 West Superior, Sunday 10:30am." },

  // PRODUCT — from ideas/backlog.md
  { title: "Record 60-second teaching video clip", category: "product", priority: "urgent", owner: "shubham", status: "backlog", description: "Single highest-impact credibility asset. Laptop webcam of real teaching beats polished sizzle reel. Embed in Hero or Team section." },
  { title: "Get session photos (UChicago, Zoom grids, whiteboards)", category: "product", priority: "urgent", owner: "shubham", status: "backlog", description: "Breaks text-wall, signals 'this has been delivered.' Even informal candid shots work." },
  { title: "Get one named testimonial", category: "product", priority: "urgent", owner: "shubham", status: "backlog", description: "UChicago student, beta participant, or colleague — real name + title + 2 sentences about teaching impact." },
  { title: "Add pricing anchor on site", category: "product", priority: "high", owner: "shubham", status: "backlog", description: "Comparison: 'Less than sending one person to a two-day conference.' HR buyers need budget context before reaching out." },
  { title: "Build lead magnet / curriculum PDF download", category: "product", priority: "high", owner: "shubham", status: "backlog", description: "Email-gated curriculum overview. Captures interested-but-not-ready visitors. HR buying cycle is 30-90 days." },
  { title: "Write 2 more insight articles", category: "product", priority: "medium", owner: "shubham", status: "backlog", description: "Continue building content library with McKinsey-style editorial pieces." },

  // BUSINESS / GTM
  { title: "Build outreach list for HR champions", category: "business-gtm", priority: "high", owner: "jt", status: "todo", description: "50 L&D directors, HR managers, and VP People targets for direct outreach." },
  { title: "Draft LinkedIn content calendar for launch", category: "business-gtm", priority: "medium", owner: "jt", status: "todo", description: "2 weeks of pre-launch content: teaser posts, behind-the-scenes, social proof." },
  { title: "Collect beta testimonials post-April 12", category: "business-gtm", priority: "high", owner: "jt", status: "backlog", description: "3-5 quotes focused on TEAM outcomes (not individual career gains). Name, title, company, one sentence." },

  // OPS
  { title: "Set up Stripe for founding cohort payments", category: "ops", priority: "high", owner: "jt", status: "todo", description: "Payment processing for individual ($1,295 founding) and team ($1,095/seat founding) enrollments." },
  { title: "Incorporate business entity", category: "ops", priority: "medium", owner: "jt", status: "backlog", description: "LLC or similar structure for Unlock Intelligence." },
  { title: "Set up shared Google Workspace", category: "ops", priority: "low", owner: "jt", status: "backlog", description: "Shared email, drive, and calendar for the team." },
];

const { rows: existingTasks } = await client.query("SELECT COUNT(*) as count FROM tasks");
if (parseInt(existingTasks[0].count) === 0) {
  for (const seed of seeds) {
    await client.query(
      `INSERT INTO tasks (title, description, category, status, priority, owner)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [seed.title, seed.description || "", seed.category, seed.status || "todo", seed.priority, seed.owner || null]
    );
  }
  console.log(`✓ Seeded ${seeds.length} tasks`);
} else {
  console.log(`Skipped seeding — ${existingTasks[0].count} tasks already exist`);
}

await client.end();
console.log("\nDone. Cockpit is ready.");
