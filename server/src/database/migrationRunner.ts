import fs from "node:fs";
import path from "node:path";
import { getDatabase } from "./connection.js";

const migrationsPath = path.join(
  process.cwd(),
  "src",
  "database",
  "migrations"
);

function getMigrationFiles(): string[] {
  return fs
    .readdirSync(migrationsPath)
    .filter((file) => file.endsWith(".sql"))
    .sort();
}

function runMigration(
  fileName: string,
  sql: string
): Promise<void> {
  const database = getDatabase();

  return new Promise((resolve, reject) => {
    database.serialize(() => {
      database.run(
        sql,
        (error) => {
          if (error) {
            reject(error);
            return;
          }

          database.run(
            "INSERT INTO migrations (name) VALUES (?)",
            [fileName],
            (insertError) => {
              if (insertError) {
                reject(insertError);
                return;
              }

              resolve();
            }
          );
        }
      );
    });
  });
}

export async function runMigrations(): Promise<void> {
  const database = getDatabase();

  await new Promise<void>((resolve, reject) => {
    database.run(
      `
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
      `,
      (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      }
    );
  });

  const files = getMigrationFiles();

  for (const file of files) {
    const sql = fs.readFileSync(
      path.join(migrationsPath, file),
      "utf8"
    );

    const alreadyApplied = await new Promise<boolean>(
      (resolve, reject) => {
        database.get(
          "SELECT id FROM migrations WHERE name = ?",
          [file],
          (error, row) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(Boolean(row));
          }
        );
      }
    );

    if (!alreadyApplied) {
      await runMigration(file, sql);
      console.log(`Migration applied: ${file}`);
    }
  }
}
