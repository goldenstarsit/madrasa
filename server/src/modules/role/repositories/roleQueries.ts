export const roleQueries = {
  findAll: `
    SELECT
      id,
      name,
      description,
      created_at,
      updated_at
    FROM roles
    ORDER BY name ASC
  `,

  findById: `
    SELECT
      id,
      name,
      description,
      created_at,
      updated_at
    FROM roles
    WHERE id = ?
  `,

  findByName: `
    SELECT
      id,
      name,
      description,
      created_at,
      updated_at
    FROM roles
    WHERE name = ?
  `,

  create: `
    INSERT INTO roles (
      name,
      description
    )
    VALUES (?, ?)
  `,

  update: `
    UPDATE roles
    SET
      name = ?,
      description = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `,

  delete: `
    DELETE FROM roles
    WHERE id = ?
  `
} as const;
