import type {
  Student,
  CreateStudentInput,
  UpdateStudentInput,
  StudentFilter,
  StudentListResult,
  StudentRepository
} from "../types/student.js";

import {
  validateCreateStudent,
  validateUpdateStudent
} from "../validation/studentValidation.js";

import {
  AppError
} from "../../../core/errors/appError.js";

export class StudentService {

  constructor(
    private readonly repository: StudentRepository
  ) {}

  async getAll(
    filter?: StudentFilter
  ): Promise<StudentListResult> {
    return this.repository.findAll(filter);
  }

  async getById(
    id: number
  ): Promise<Student | null> {
    return this.repository.findById(id);
  }

  async getByAdmissionNo(
    admissionNo: string
  ): Promise<Student | null> {
    return this.repository.findByAdmissionNo(admissionNo);
  }

  async create(
    input: CreateStudentInput
  ): Promise<Student> {

    const validation =
      validateCreateStudent(input);

    if (!validation.valid) {
      throw new AppError(
        "VALIDATION_ERROR",
        validation.message ?? "Invalid student data"
      );
    }

    const existing =
      await this.repository.findByAdmissionNo(
        input.admission_no
      );

    if (existing) {
      throw new AppError(
        "DUPLICATE_ENTRY",
        "Admission number already exists"
      );
    }

    return this.repository.create(input);

  }

  async update(
    id: number,
    input: UpdateStudentInput
  ): Promise<Student> {

    const validation =
      validateUpdateStudent(input);

    if (!validation.valid) {
      throw new AppError(
        "VALIDATION_ERROR",
        validation.message ?? "Invalid student data"
      );
    }

    if (input.admission_no) {

      const existing =
        await this.repository.findByAdmissionNo(
          input.admission_no
        );

      if (
        existing &&
        existing.id !== id
      ) {
        throw new AppError(
          "DUPLICATE_ENTRY",
          "Admission number already exists"
        );
      }

    }

    return this.repository.update(
      id,
      input
    );

  }

  async delete(
    id: number
  ): Promise<void> {
    await this.repository.delete(id);
  }

}
