import { StudentService } from "../services/studentService.js";

import type {
  Student,
  CreateStudentInput,
  UpdateStudentInput,
  StudentFilter,
  StudentListResult
} from "../types/student.js";

export interface StudentHandlers {
  readonly service: StudentService;

  createStudent(
    input: CreateStudentInput
  ): Promise<Student>;

  getStudents(
    filter?: StudentFilter
  ): Promise<StudentListResult>;

  getStudentById(
    id: number
  ): Promise<Student | null>;

  updateStudent(
    id: number,
    input: UpdateStudentInput
  ): Promise<Student>;

  deleteStudent(
    id: number
  ): Promise<void>;
}

export function createStudentHandlers(
  service: StudentService
): StudentHandlers {

  return {

    service,

    async createStudent(
      input: CreateStudentInput
    ): Promise<Student> {
      return service.create(input);
    },

    async getStudents(
      filter?: StudentFilter
    ): Promise<StudentListResult> {
      return service.getAll(filter);
    },

    async getStudentById(
      id: number
    ): Promise<Student | null> {
      return service.getById(id);
    },

    async updateStudent(
      id: number,
      input: UpdateStudentInput
    ): Promise<Student> {
      return service.update(id, input);
    },

    async deleteStudent(
      id: number
    ): Promise<void> {
      await service.delete(id);
    }

  };

}
