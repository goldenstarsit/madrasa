export const authQueries = {

  findUserForLogin: `
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
    LIMIT 1
  `

} as const;
