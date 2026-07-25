import {
  PermissionRepository
} from "../repositories/permissionRepository.js";

import type {
  Permission,
  CreatePermissionInput,
  UpdatePermissionInput,
  PermissionFilter
} from "../types/permission.js";


export class PermissionService {

  constructor(
    private readonly repository: PermissionRepository
  ) {}


  async getAll(
    filter?: PermissionFilter
  ): Promise<Permission[]> {

    const result =
      await this.repository.findAll(
        filter
      );

    return result.items;
  }


  async getById(
    id: number
  ): Promise<Permission | null> {

    return this.repository.findById(
      id
    );
  }


  async getByCode(
    code: string
  ): Promise<Permission | null> {

    return this.repository.findByCode(
      code
    );
  }


  async create(
    input: CreatePermissionInput
  ): Promise<Permission> {

    const existing =
      await this.repository.findByCode(
        input.code
      );

    if (existing) {
      throw new Error(
        "Permission code already exists"
      );
    }

    return this.repository.create(
      input
    );
  }


  async update(
    id: number,
    input: UpdatePermissionInput
  ): Promise<Permission> {

    const permission =
      await this.repository.findById(
        id
      );

    if (!permission) {
      throw new Error(
        "Permission not found"
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

    const permission =
      await this.repository.findById(
        id
      );

    if (!permission) {
      throw new Error(
        "Permission not found"
      );
    }

    await this.repository.delete(
      id
    );
  }
}
