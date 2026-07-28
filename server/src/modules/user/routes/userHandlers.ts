import { UserService } from "../services/userService.js";

import type {
  User,
  CreateUserInput,
  UpdateUserInput,
  UserFilter,
  UserListResult
} from "../types/user.js";

export interface UserHandlers {
  readonly service: UserService;

  createUser(
    input: CreateUserInput
  ): Promise<User>;

  getUsers(
    filter?: UserFilter
  ): Promise<UserListResult>;

  getUserById(
    id: number
  ): Promise<User | null>;

  updateUser(
    id: number,
    input: UpdateUserInput
  ): Promise<User>;

  deleteUser(
    id: number
  ): Promise<void>;
}

export function createUserHandlers(
  service: UserService
): UserHandlers {

  return {

    service,

    async createUser(
      input: CreateUserInput
    ): Promise<User> {
      return service.create(input);
    },

    async getUsers(
      filter?: UserFilter
    ): Promise<UserListResult> {
      return service.getAll(filter);
    },

    async getUserById(
      id: number
    ): Promise<User | null> {
      return service.getById(id);
    },

    async updateUser(
      id: number,
      input: UpdateUserInput
    ): Promise<User> {
      return service.update(id, input);
    },

    async deleteUser(
      id: number
    ): Promise<void> {
      await service.delete(id);
    }

  };

}
