export const userQueries = {
  findAll: `
    SELECT
      id,
      username,
      email,
      password_hash,
      role_id,
      is_active,
      created_at,
      updated_at
    FROM users
    ORDER BY username ASC
  `,

  findById: `
    SELECT
      id,
      username,
      email,
      password_hash,
      role_id,
      is_active,
      created_at,
      updated_at
    FROM users
    WHERE id = ?
  `,

  findByUsername: `
    SELECT
      id,
      username,
      email,
      password_hash,
      role_id,
      is_active,
      created_at,
      updated_at
    FROM users
    WHERE username = ?
  `,

  findByEmail: `
    SELECT
      id,
      username,
      email,
      password_hash,
      role_id,
      is_active,
      created_at,
      updated_at
    FROM users
    WHERE email = ?
  `,

  create: `
    INSERT INTO users (
      username,
      email,
      password_hash,
      role_id,
      is_active
    )
    VALUES (?, ?, ?, ?, ?)
  `,

  update: `
    UPDATE users
    SET
      username = ?,
      email = ?,
      password_hash = ?,
      role_id = ?,
      is_active = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `,

  delete: `
    DELETE FROM users
    WHERE id = ?
  `
} as const;
