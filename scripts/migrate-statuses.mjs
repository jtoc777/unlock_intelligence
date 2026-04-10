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

// Drop constraint first
await client.query(`ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_status_check`);
console.log("✓ Dropped old constraint");

// Migrate old statuses to new ones
await client.query(`UPDATE tasks SET status = 'postponed' WHERE status = 'backlog'`);
await client.query(`UPDATE tasks SET status = 'complete' WHERE status = 'done'`);
// todo and in-progress stay the same
console.log("✓ Migrated existing status values");

// Add new constraint
await client.query(`ALTER TABLE tasks ADD CONSTRAINT tasks_status_check CHECK (status IN ('todo', 'in-progress', 'blocked', 'at-risk', 'postponed', 'complete'))`);
console.log("✓ Added new status constraint");

await client.end();
console.log("Done.");
