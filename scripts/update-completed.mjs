import pg from "pg";
import { readFileSync } from "fs";
import { resolve } from "path";

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

// From beta-todo.md — these items are checked [x] (already done)
const completedPatterns = [
  "Pre-build the deliberate failure prompt", // Friday remaining but likely done by now based on flow
  "Script opening 15 seconds", // Same
];

// These items were in the "Done" sections of beta-todo.md
const alreadyDone = [
  "Venue confirmed",
  "Pre-work email sent",
  "curriculum artifacts reviewed",
  "Worksheet rewritten",
  "Instructor agent review",
  "Syllabus updated",
];

// From backlog.md — checked [x] items
const backlogDone = [
  "ROI quantification", // shipped as problem.tsx change
  "ProofBar honesty reframe", // shipped
  "Design elevation batch", // shipped
];

// Mark tasks that match backlog done items as complete
for (const pattern of backlogDone) {
  const { rowCount } = await client.query(
    `UPDATE tasks SET status = 'complete' WHERE title ILIKE $1 AND status != 'complete'`,
    [`%${pattern}%`]
  );
  if (rowCount > 0) console.log(`✓ Marked complete: ${pattern}`);
}

// Verify current state
const { rows } = await client.query(
  `SELECT status, COUNT(*) as count FROM tasks GROUP BY status ORDER BY count DESC`
);
console.log("\nTask status breakdown:");
for (const row of rows) {
  console.log(`  ${row.status}: ${row.count}`);
}

const { rows: all } = await client.query(`SELECT title, status, owner, priority FROM tasks ORDER BY status, priority`);
console.log("\nAll tasks:");
for (const t of all) {
  console.log(`  [${t.status}] ${t.priority.toUpperCase()} | ${t.owner || 'unassigned'} | ${t.title}`);
}

await client.end();
