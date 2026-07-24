import sqlite3 from "sqlite3";
import { databaseConfig } from "./config.js";

sqlite3.verbose();

let database: sqlite3.Database | null = null;

function initializeDatabase(
  db: sqlite3.Database
): void {
  db.serialize(() => {
    db.run(
      "PRAGMA foreign_keys = ON;"
    );

    db.run(
      "PRAGMA busy_timeout = 5000;"
    );
  });
}

export function getDatabase(): sqlite3.Database {
  if (database) {
    return database;
  }

  database = new sqlite3.Database(
    databaseConfig.filename,
    (error) => {
      if (error) {
        console.error(
          "Database connection failed:",
          error.message
        );
        return;
      }

      initializeDatabase(database!);

      console.log(
        "SQLite database connected successfully"
      );
    }
  );

  return database;
}

export function closeDatabase(): void {
  if (!database) {
    return;
  }

  database.close((error) => {
    if (error) {
      console.error(
        "Database close failed:",
        error.message
      );
      return;
    }

    console.log(
      "SQLite database connection closed"
    );
  });

  database = null;
}
