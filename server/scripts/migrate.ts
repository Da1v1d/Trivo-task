import { Pool } from "pg";
import { readdir, readFile } from "fs/promises";
import { join } from "path";

const run = async () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const migrationsDir = join(__dirname, "..", "sql", "migrations");
  const files = (await readdir(migrationsDir))
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const sql = await readFile(join(migrationsDir, file), "utf-8");
    console.log(`Running migration: ${file}`);
    await pool.query(sql);
  }

  console.log("Migrations complete.");
  await pool.end();
};

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
