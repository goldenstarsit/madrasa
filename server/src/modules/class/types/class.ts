export interface ClassRoom {

  id: number;

  name: string;

  description: string | null;

  is_active: boolean;

  created_at: string;

  updated_at: string;

}


export interface CreateClassInput {

  name: string;

  description?: string | null;

  is_active?: boolean;

}


export interface UpdateClassInput {

  name?: string;

  description?: string | null;

  is_active?: boolean;

}


export interface ClassFilter {

  name?: string;

  is_active?: boolean;

}


export interface ClassListResult {

  items: ClassRoom[];

  total: number;

}


export interface ClassRepository {

  findAll(
    filter?: ClassFilter
  ): Promise<ClassListResult>;

  findById(
    id: number
  ): Promise<ClassRoom | null>;

  findByName(
    name: string
  ): Promise<ClassRoom | null>;

  create(
    input: CreateClassInput
  ): Promise<ClassRoom>;

  update(
    id: number,
    input: UpdateClassInput
  ): Promise<ClassRoom>;

  delete(
    id: number
  ): Promise<void>;

}
