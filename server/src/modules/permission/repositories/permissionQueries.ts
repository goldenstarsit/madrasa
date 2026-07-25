export const permissionQueries = {
  findAll: `
    SELECT
      id,
      code,
      name,
      description,
      module,
      created_at,
      updated_at
    FROM permissions
    ORDER BY module ASC, name ASC
  `,

  findById: `
    SELECT
      id,
      code,
      name,
      description,
      module,
      created_at,
      updated_at
    FROM permissions
    WHERE id = ?
  `,

  findByCode: `
    SELECT
      id,
      code,
      name,
      description,
      module,
      created_at,
      updated_at
    FROM permissions
    WHERE code = ?
  `,

  create: `
    INSERT INTO permissions (
      code,
      name,
      description,
      module
    )
    VALUES (?, ?, ?, ?)
  `,

  update: `
    UPDATE permissions
    SET
      name = ?,
      description = ?,
      module = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `,

  delete: `
    DELETE FROM permissions
    WHERE id = ?
  `
} as const;
