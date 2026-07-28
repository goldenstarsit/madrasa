export interface User {

  id: number;

  username: string;

  email: string | null;

  password_hash: string;

  role_id: number | null;

  is_active: boolean;

  created_at: string;

  updated_at: string;

}


export interface CreateUserInput {

  username: string;

  email?: string | null;

  password_hash: string;

  role_id: number | null;

  is_active?: boolean;

}


export interface UpdateUserInput {

  username?: string;

  email?: string | null;

  role_id?: number;

  password_hash?: string;

  is_active?: boolean;

}


export interface UserFilter {

  username?: string;

  role_id?: number;

}


export interface UserListResult {

  items: User[];

  total: number;

}


export interface UserRepository {

  findAll(
    filter?: UserFilter
  ): Promise<UserListResult>;


  findById(
    id: number
  ): Promise<User | null>;


  findByUsername(
    username: string
  ): Promise<User | null>;


  create(
    input: CreateUserInput
  ): Promise<User>;


  update(
    id: number,
    input: UpdateUserInput
  ): Promise<User>;


  delete(
    id: number
  ): Promise<void>;

}
