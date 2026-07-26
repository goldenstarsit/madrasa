export const authorizationQueries = {

  getUserPermissions: `
    SELECT
      p.id,
      p.code,
      p.name,
      p.module
    FROM users u
    INNER JOIN roles r
      ON r.id = u.role_id
    INNER JOIN roles_permissions rp
      ON rp.role_id = r.id
    INNER JOIN permissions p
      ON p.id = rp.permission_id
    WHERE u.id = ?
    ORDER BY
      p.module ASC,
      p.name ASC
  `,

  hasPermission: `
    SELECT
      1
    FROM users u
    INNER JOIN roles r
      ON r.id = u.role_id
    INNER JOIN roles_permissions rp
      ON rp.role_id = r.id
    INNER JOIN permissions p
      ON p.id = rp.permission_id
    WHERE
      u.id = ?
      AND p.code = ?
    LIMIT 1
  `

} as const;
