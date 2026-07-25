import type {
  User
} from "../../user/types/user.js";


export interface LoginInput {
  username: string;
  password: string;
}


export interface AuthUser {
  id: number;
  username: string;
  email: string | null;
  role_id: number | null;
}


export interface AuthResult {
  user: AuthUser;
  token?: string;
}


export interface AuthRepository {
  findUserForLogin(
    username: string
  ): Promise<User | null>;
}


export interface PasswordService {
  hash(
    password: string
  ): Promise<string>;

  compare(
    password: string,
    hash: string
  ): Promise<boolean>;
}
