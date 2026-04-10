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

// Enable Realtime for tasks and task_notes tables
await client.query(`
  ALTER PUBLICATION supabase_realtime ADD TABLE tasks;
`);
console.log("✓ Realtime enabled for tasks");

await client.query(`
  ALTER PUBLICATION supabase_realtime ADD TABLE task_notes;
`);
console.log("✓ Realtime enabled for task_notes");

await client.end();
console.log("Done.");
