export const classQueries = {

  findAll: `
    SELECT
      id,
      name,
      description,
      is_active,
      created_at,
      updated_at
    FROM classes
    ORDER BY name ASC
  `,

  findById: `
    SELECT
      id,
      name,
      description,
      is_active,
      created_at,
      updated_at
    FROM classes
    WHERE id = ?
  `,

  findByName: `
    SELECT
      id,
      name,
      description,
      is_active,
      created_at,
      updated_at
    FROM classes
    WHERE name = ?
  `,

  create: `
    INSERT INTO classes (
      name,
      description,
      is_active
    )
    VALUES (?, ?, ?)
  `,

  update: `
    UPDATE classes
    SET
      name = ?,
      description = ?,
      is_active = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `,

  delete: `
    DELETE FROM classes
    WHERE id = ?
  `

} as const;
