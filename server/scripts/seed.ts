import { Pool } from "pg";
import { readdir, readFile } from "fs/promises";
import { join } from "path";

const run = async () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const seedDir = join(__dirname, "..", "sql", "seed");
  const files = (await readdir(seedDir))
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const sql = await readFile(join(seedDir, file), "utf-8");
    console.log(`Running seed: ${file}`);
    await pool.query(sql);
  }

  console.log("Seed complete.");
  await pool.end();
};

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
