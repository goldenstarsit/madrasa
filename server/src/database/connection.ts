import sqlite3 from "sqlite3";


let database: sqlite3.Database | null = null;


const DATABASE_PATH =
  "src/database/madrasa.db";


export function getDatabase(): sqlite3.Database {

  if (!database) {

    database = new sqlite3.Database(
      DATABASE_PATH,
      (error) => {

        if (error) {
          console.error(
            "Database connection failed:",
            error
          );
        }

      }
    );

  }


  return database;

}


export function closeDatabase(): void {

  if (database) {

    database.close();

    database = null;

  }

}
