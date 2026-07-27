import type {
  Role,
  CreateRoleInput,
  UpdateRoleInput,
  RoleFilter
} from "../types/role.js";

import {
  validateCreateRole,
  validateUpdateRole
} from "../validation/roleValidation.js";

import type {
  RoleRepository as RoleRepositoryContract
} from "../types/role.js";


export class RoleService {

  constructor(
    private readonly repository: RoleRepositoryContract
  ) {}


  async getAll(
    filter?: RoleFilter
  ): Promise<Role[]> {

    const result =
      await this.repository.findAll(
        filter
      );

    return result.items;
  }


  async getById(
    id: number
  ): Promise<Role | null> {

    return this.repository.findById(
      id
    );
  }


  async getByName(
    name: string
  ): Promise<Role | null> {

    return this.repository.findByName(
      name
    );
  }


  async create(
    input: CreateRoleInput
  ): Promise<Role> {

    const validation =
      validateCreateRole(input);

    if (!validation.valid) {
      throw new Error(
        validation.message
      );
    }

    const existing =
      await this.repository.findByName(
        input.name
      );

    if (existing) {
      throw new Error(
        "Role name already exists"
      );
    }

    return this.repository.create(
      input
    );
  }


  async update(
    id: number,
    input: UpdateRoleInput
  ): Promise<Role> {

    const validation =
      validateUpdateRole(input);

    if (!validation.valid) {
      throw new Error(
        validation.message
      );
    }

    const role =
      await this.repository.findById(
        id
      );

    if (!role) {
      throw new Error(
        "Role not found"
      );
    }

    return this.repository.update(
      id,
      input
    );
  }


  async delete(
    id: number
  ): Promise<void> {

    const role =
      await this.repository.findById(
        id
      );

    if (!role) {
      throw new Error(
        "Role not found"
      );
    }

    await this.repository.delete(
      id
    );
  }
}
