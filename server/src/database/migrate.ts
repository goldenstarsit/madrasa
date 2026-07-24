import { runMigrations } from "./migrationRunner.js";

runMigrations()
  .then(() => {
    console.log(
      "Database migrations completed"
    );
    process.exit(0);
  })
  .catch((error) => {
    console.error(
      "Migration failed:",
      error
    );
    process.exit(1);
  });
