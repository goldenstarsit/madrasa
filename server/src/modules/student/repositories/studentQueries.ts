export const studentQueries = {

  findAll: `
    SELECT
      id,
      admission_no,
      full_name,
      father_name,
      date_of_birth,
      phone,
      address,
      role_id,
      is_active,
      created_at,
      updated_at
    FROM students
    ORDER BY full_name ASC
  `,

  findById: `
    SELECT
      id,
      admission_no,
      full_name,
      father_name,
      date_of_birth,
      phone,
      address,
      role_id,
      is_active,
      created_at,
      updated_at
    FROM students
    WHERE id = ?
  `,

  findByAdmissionNo: `
    SELECT
      id,
      admission_no,
      full_name,
      father_name,
      date_of_birth,
      phone,
      address,
      role_id,
      is_active,
      created_at,
      updated_at
    FROM students
    WHERE admission_no = ?
  `,

  create: `
    INSERT INTO students (
      admission_no,
      full_name,
      father_name,
      date_of_birth,
      phone,
      address,
      role_id,
      is_active
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `,

  update: `
    UPDATE students
    SET
      admission_no = ?,
      full_name = ?,
      father_name = ?,
      date_of_birth = ?,
      phone = ?,
      address = ?,
      role_id = ?,
      is_active = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `,

  delete: `
    DELETE FROM students
    WHERE id = ?
  `

} as const;
