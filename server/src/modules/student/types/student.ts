export interface Student {

  id: number;

  admission_no: string;

  full_name: string;

  father_name: string;

  date_of_birth: string | null;

  phone: string | null;

  address: string | null;

  role_id: number | null;

  is_active: boolean;

  created_at: string;

  updated_at: string;

}

export interface CreateStudentInput {

  admission_no: string;

  full_name: string;

  father_name: string;

  date_of_birth?: string | null;

  phone?: string | null;

  address?: string | null;

  role_id?: number | null;

  is_active?: boolean;

}

export interface UpdateStudentInput {

  admission_no?: string;

  full_name?: string;

  father_name?: string;

  date_of_birth?: string | null;

  phone?: string | null;

  address?: string | null;

  role_id?: number | null;

  is_active?: boolean;

}

export interface StudentFilter {

  admission_no?: string;

  full_name?: string;

  is_active?: boolean;

}

export interface StudentListResult {

  items: Student[];

  total: number;

}

export interface StudentRepository {

  findAll(
    filter?: StudentFilter
  ): Promise<StudentListResult>;

  findById(
    id: number
  ): Promise<Student | null>;

  findByAdmissionNo(
    admissionNo: string
  ): Promise<Student | null>;

  create(
    input: CreateStudentInput
  ): Promise<Student>;

  update(
    id: number,
    input: UpdateStudentInput
  ): Promise<Student>;

  delete(
    id: number
  ): Promise<void>;

}
