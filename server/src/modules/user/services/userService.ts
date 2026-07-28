import type {
  User,
  CreateUserInput,
  UpdateUserInput,
  UserFilter,
  UserListResult,
  UserRepository
} from "../types/user.js";

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

    const existing =
      await this.repository.findByUsername(
        input.username
      );

    if (existing) {
      throw new Error(
        "Username already exists"
      );
    }

    return this.repository.create(input);
  }

  async update(
    id: number,
    input: UpdateUserInput
  ): Promise<User> {
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
