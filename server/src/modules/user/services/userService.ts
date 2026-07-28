import type {
  User,
  CreateUserInput,
  UpdateUserInput,
  UserFilter,
  UserListResult,
  UserRepository
} from "../types/user.js";

import {
  validateCreateUser,
  validateUpdateUser
} from "../validation/userValidation.js";

import {
  validateUserDeletion,
  validateUserActivation
} from "../validation/systemUserRules.js";

import {
  AppError
} from "../../../core/errors/appError.js";

export class UserService {

  constructor(
    private readonly repository: UserRepository
  ) {}

  async getAll(
    filter?: UserFilter
  ): Promise<UserListResult> {
    return this.repository.findAll(filter);
  }

  async getById(
    id: number
  ): Promise<User | null> {
    return this.repository.findById(id);
  }

  async getByUsername(
    username: string
  ): Promise<User | null> {
    return this.repository.findByUsername(username);
  }

  async create(
    input: CreateUserInput
  ): Promise<User> {

    const validation =
      validateCreateUser(input);

    if (!validation.valid) {
      throw new AppError(
        "VALIDATION_ERROR",
        validation.message ?? "Invalid user data"
      );
    }

    const existing =
      await this.repository.findByUsername(
        input.username
      );

    if (existing) {
      throw new AppError(
        "DUPLICATE_ENTRY",
        "Username already exists"
      );
    }

    if (input.email) {

      const existingEmail =
        await this.repository.findByEmail(
          input.email
        );

      if (existingEmail) {
        throw new AppError(
          "DUPLICATE_ENTRY",
          "Email already exists"
        );
      }

    }

    return this.repository.create(input);
  }

  async update(
    id: number,
    input: UpdateUserInput
  ): Promise<User> {

    const current =
      await this.repository.findById(id);

    if (!current) {
      throw new AppError(
        "NOT_FOUND",
        "User not found"
      );
    }

    if (input.is_active !== undefined) {

      const activation =
        validateUserActivation(
          current.username,
          input.is_active
        );

      if (!activation.valid) {
        throw new AppError(
          "FORBIDDEN",
          activation.message ?? "Operation not allowed"
        );
      }

    }

    const validation =
      validateUpdateUser(input);

    if (!validation.valid) {
      throw new AppError(
        "VALIDATION_ERROR",
        validation.message ?? "Invalid user data"
      );
    }

    if (input.username) {

      const existing =
        await this.repository.findByUsername(
          input.username
        );

      if (
        existing &&
        existing.id !== id
      ) {
        throw new AppError(
          "DUPLICATE_ENTRY",
          "Username already exists"
        );
      }

    }


    if (input.email) {

      const existingEmail =
        await this.repository.findByEmail(
          input.email
        );

      if (
        existingEmail &&
        existingEmail.id !== id
      ) {
        throw new AppError(
          "DUPLICATE_ENTRY",
          "Email already exists"
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

    const user =
      await this.repository.findById(id);

    if (!user) {
      throw new AppError(
        "NOT_FOUND",
        "User not found"
      );
    }

    const deletion =
      validateUserDeletion(
        user.username
      );

    if (!deletion.valid) {
      throw new AppError(
        "FORBIDDEN",
        deletion.message ?? "Operation not allowed"
      );
    }

    await this.repository.delete(id);
  }

}
