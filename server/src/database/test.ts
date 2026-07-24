import sqlite3 from "sqlite3";
import { getDatabase, closeDatabase } from "./connection.js";
import { runMigrations } from "./migrationRunner.js";

sqlite3.verbose();

function run(
  database: sqlite3.Database,
  sql: string,
  params: unknown[] = []
): Promise<void> {
  return new Promise((resolve, reject) => {
    database.run(
      sql,
      params,
      (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      }
    );
  });
}

function get<T>(
  database: sqlite3.Database,
  sql: string,
  params: unknown[] = []
): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    database.get(
      sql,
      params,
      (error, row) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(row as T | undefined);
      }
    );
  });
}

async function testDatabaseConnection(): Promise<void> {
  const database = getDatabase();

  await get(
    database,
    "SELECT 1 AS value"
  );

  console.log(
    "✓ Database connection test passed"
  );
}

async function testMigrations(): Promise<void> {
  const database = getDatabase();

  await runMigrations();

  const row = await get<{ count: number }>(
    database,
    `
    SELECT COUNT(*) as count
    FROM migrations
    `
  );

  if (!row || row.count < 6) {
    throw new Error(
      "Migration verification failed"
    );
  }

  console.log(
    "✓ Migration verification passed"
  );
}

async function cleanupTestData(): Promise<void> {
  const database = getDatabase();

  await run(
    database,
    `
    DELETE FROM user_permissions
    WHERE user_id IN (
      SELECT id FROM users
      WHERE username LIKE 'test_%'
    )
    `
  );

  await run(
    database,
    `
    DELETE FROM role_permissions
    WHERE role_id IN (
      SELECT id FROM roles
      WHERE name LIKE 'test_%'
    )
    `
  );

  await run(
    database,
    `
    DELETE FROM users
    WHERE username LIKE 'test_%'
    `
  );

  await run(
    database,
    `
    DELETE FROM permissions
    WHERE code LIKE 'test_%'
    `
  );

  await run(
    database,
    `
    DELETE FROM roles
    WHERE name LIKE 'test_%'
    `
  );
}

async function main(): Promise<void> {
  try {
    console.log(
      "Starting database test suite..."
    );

    await testDatabaseConnection();

    await testMigrations();

    await cleanupTestData();


    await testRoleCreation();

    await testPermissionCreation();

    await testUserCreation();

    await testRolePermissionRelation();

    await testUserPermissionRelation();

    await testUniqueConstraints();

    await testForeignKeyConstraints();

    await cleanupTestData();

    console.log(
      "✓ Database test suite completed successfully"
    );
  } catch (error) {
    console.error(
      "Database test failed:",
      error
    );

    process.exitCode = 1;
  } finally {
    closeDatabase();
  }
}

async function testRoleCreation(): Promise<void> {
  const database = getDatabase();

  await run(
    database,
    `
    INSERT INTO roles (
      name,
      description
    )
    VALUES (?, ?)
    `,
    [
      "test_admin",
      "Test role"
    ]
  );

  const role =
    await get<{ id: number }>(
      database,
      `
      SELECT id
      FROM roles
      WHERE name = ?
      `,
      [
        "test_admin"
      ]
    );

  if (!role) {
    throw new Error(
      "Role creation failed"
    );
  }

  console.log(
    "✓ Role CRUD test passed"
  );
}

async function testPermissionCreation(): Promise<void> {
  const database = getDatabase();

  await run(
    database,
    `
    INSERT INTO permissions (
      code,
      name,
      module
    )
    VALUES (?, ?, ?)
    `,
    [
      "test_permission",
      "Test Permission",
      "test"
    ]
  );

  const permission =
    await get<{ id: number }>(
      database,
      `
      SELECT id
      FROM permissions
      WHERE code = ?
      `,
      [
        "test_permission"
      ]
    );

  if (!permission) {
    throw new Error(
      "Permission creation failed"
    );
  }

  console.log(
    "✓ Permission CRUD test passed"
  );
}

async function testUserCreation(): Promise<void> {
  const database = getDatabase();

  const role =
    await get<{ id: number }>(
      database,
      `
      SELECT id
      FROM roles
      WHERE name = ?
      `,
      [
        "test_admin"
      ]
    );

  if (!role) {
    throw new Error(
      "Required test role not found"
    );
  }

  await run(
    database,
    `
    INSERT INTO users (
      username,
      password_hash,
      full_name,
      role_id
    )
    VALUES (?, ?, ?, ?)
    `,
    [
      "test_user",
      "hash",
      "Test User",
      role.id
    ]
  );

  const user =
    await get<{ id: number }>(
      database,
      `
      SELECT id
      FROM users
      WHERE username = ?
      `,
      [
        "test_user"
      ]
    );

  if (!user) {
    throw new Error(
      "User creation failed"
    );
  }

  console.log(
    "✓ User CRUD test passed"
  );
}


async function testRolePermissionRelation(): Promise<void> {
  const database = getDatabase();

  const role =
    await get<{ id: number }>(
      database,
      `
      SELECT id
      FROM roles
      WHERE name = ?
      `,
      [
        "test_admin"
      ]
    );

  const permission =
    await get<{ id: number }>(
      database,
      `
      SELECT id
      FROM permissions
      WHERE code = ?
      `,
      [
        "test_permission"
      ]
    );

  if (!role || !permission) {
    throw new Error(
      "Role or permission not found"
    );
  }

  await run(
    database,
    `
    INSERT INTO role_permissions (
      role_id,
      permission_id
    )
    VALUES (?, ?)
    `,
    [
      role.id,
      permission.id
    ]
  );

  console.log(
    "✓ Role permission relation test passed"
  );
}

async function testUserPermissionRelation(): Promise<void> {
  const database = getDatabase();

  const user =
    await get<{ id: number }>(
      database,
      `
      SELECT id
      FROM users
      WHERE username = ?
      `,
      [
        "test_user"
      ]
    );

  const permission =
    await get<{ id: number }>(
      database,
      `
      SELECT id
      FROM permissions
      WHERE code = ?
      `,
      [
        "test_permission"
      ]
    );

  if (!user || !permission) {
    throw new Error(
      "User or permission not found"
    );
  }

  await run(
    database,
    `
    INSERT INTO user_permissions (
      user_id,
      permission_id
    )
    VALUES (?, ?)
    `,
    [
      user.id,
      permission.id
    ]
  );

  console.log(
    "✓ User permission relation test passed"
  );
}

async function testUniqueConstraints(): Promise<void> {
  const database = getDatabase();

  let failed = false;

  try {
    await run(
      database,
      `
      INSERT INTO roles (
        name
      )
      VALUES (?)
      `,
      [
        "test_admin"
      ]
    );
  } catch {
    failed = true;
  }

  if (!failed) {
    throw new Error(
      "Role unique constraint failed"
    );
  }

  console.log(
    "✓ Unique constraint test passed"
  );
}

async function testForeignKeyConstraints(): Promise<void> {
  const database = getDatabase();

  let failed = false;

  try {
    await run(
      database,
      `
      INSERT INTO users (
        username,
        password_hash,
        full_name,
        role_id
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        "test_invalid_user",
        "hash",
        "Invalid User",
        999999
      ]
    );
  } catch {
    failed = true;
  }

  if (!failed) {
    throw new Error(
      "Foreign key constraint test failed"
    );
  }

  console.log(
    "✓ Foreign key constraint test passed"
  );
}

main();

