import {
  getDatabase
} from "../../../database/connection.js";

import {
  studentQueries
} from "./studentQueries.js";

import type {
  Student,
  CreateStudentInput,
  UpdateStudentInput,
  StudentFilter,
  StudentListResult,
  StudentRepository as StudentRepositoryContract
} from "../types/student.js";

interface StudentRow {
  id: number;
  admission_no: string;
  full_name: string;
  father_name: string;
  date_of_birth: string | null;
  phone: string | null;
  address: string | null;
  role_id: number | null;
  is_active: number;
  created_at: string;
  updated_at: string;
}

function mapStudent(
  row: StudentRow
): Student {
  return {
    id: row.id,
    admission_no: row.admission_no,
    full_name: row.full_name,
    father_name: row.father_name,
    date_of_birth: row.date_of_birth,
    phone: row.phone,
    address: row.address,
    role_id: row.role_id,
    is_active: Boolean(row.is_active),
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}

function get<T>(
  sql: string,
  params: unknown[] = []
): Promise<T | undefined> {

  const database = getDatabase();

  return new Promise(
    (resolve, reject) => {
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
    }
  );

}

function all<T>(
  sql: string,
  params: unknown[] = []
): Promise<T[]> {

  const database = getDatabase();

  return new Promise(
    (resolve, reject) => {
      database.all(
        sql,
        params,
        (error, rows) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(rows as T[]);
        }
      );
    }
  );

}

function run(
  sql: string,
  params: unknown[] = []
): Promise<void> {

  const database = getDatabase();

  return new Promise(
    (resolve, reject) => {
      database.run(
        sql,
        params,
        error => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        }
      );
    }
  );

}

export class StudentRepository
  implements StudentRepositoryContract {

  async findAll(
    _filter?: StudentFilter
  ): Promise<StudentListResult> {

    const rows =
      await all<StudentRow>(
        studentQueries.findAll
      );

    return {
      items: rows.map(mapStudent),
      total: rows.length
    };

  }

  async findById(
    id: number
  ): Promise<Student | null> {

    const row =
      await get<StudentRow>(
        studentQueries.findById,
        [id]
      );

    if (!row) {
      return null;
    }

    return mapStudent(row);

  }

  async findByAdmissionNo(
    admissionNo: string
  ): Promise<Student | null> {

    const row =
      await get<StudentRow>(
        studentQueries.findByAdmissionNo,
        [admissionNo]
      );

    if (!row) {
      return null;
    }

    return mapStudent(row);

  }

  async create(
    input: CreateStudentInput
  ): Promise<Student> {

    await run(
      studentQueries.create,
      [
        input.admission_no,
        input.full_name,
        input.father_name,
        input.date_of_birth ?? null,
        input.phone ?? null,
        input.address ?? null,
        input.role_id ?? null,
        input.is_active === false ? 0 : 1
      ]
    );

    const created =
      await this.findByAdmissionNo(
        input.admission_no
      );

    if (!created) {
      throw new Error(
        "Failed to create student"
      );
    }

    return created;

  }

  async update(
    id: number,
    input: UpdateStudentInput
  ): Promise<Student> {

    const current =
      await this.findById(id);

    if (!current) {
      throw new Error(
        "Student not found"
      );
    }

    await run(
      studentQueries.update,
      [
        input.admission_no ?? current.admission_no,
        input.full_name ?? current.full_name,
        input.father_name ?? current.father_name,
        input.date_of_birth ?? current.date_of_birth,
        input.phone ?? current.phone,
        input.address ?? current.address,
        input.role_id ?? current.role_id,
        input.is_active === undefined
          ? (current.is_active ? 1 : 0)
          : (input.is_active ? 1 : 0),
        id
      ]
    );

    const updated =
      await this.findById(id);

    if (!updated) {
      throw new Error(
        "Failed to update student"
      );
    }

    return updated;

  }

  async delete(
    id: number
  ): Promise<void> {

    const current =
      await this.findById(id);

    if (!current) {
      throw new Error(
        "Student not found"
      );
    }

    await run(
      studentQueries.delete,
      [id]
    );

  }

}
