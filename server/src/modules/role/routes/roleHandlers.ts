import { RoleService } from "../services/roleService.js";

import type {
  CreateRoleInput,
  UpdateRoleInput,
  Role,
  RoleFilter
} from "../types/role.js";

export interface RoleHandlers {
  readonly service: RoleService;

  createRole(
    input: CreateRoleInput
  ): Promise<Role>;

  getRoles(
    filter?: RoleFilter
  ): Promise<Role[]>;

  getRoleById(
    id: number
  ): Promise<Role | null>;

  updateRole(
    id: number,
    input: UpdateRoleInput
  ): Promise<Role>;

  deleteRole(
    id: number
  ): Promise<void>;
}

function validateCreateRole(
  input: CreateRoleInput
): void {

  if (!input.name.trim()) {
    throw new Error("Role name is required");
  }

}

function validateUpdateRole(
  input: UpdateRoleInput
): void {

  if (
    input.name !== undefined &&
    !input.name.trim()
  ) {
    throw new Error("Role name is required");
  }

}

export function createRoleHandlers(
  service: RoleService
): RoleHandlers {

  return {

    service,

    async createRole(
      input: CreateRoleInput
    ): Promise<Role> {

      validateCreateRole(input);

      return service.create(input);

    },

    async getRoles(
      filter?: RoleFilter
    ): Promise<Role[]> {

      return service.getAll(filter);

    },

    async getRoleById(
      id: number
    ): Promise<Role | null> {

      return service.getById(id);

    },

    async updateRole(
      id: number,
      input: UpdateRoleInput
    ): Promise<Role> {

      validateUpdateRole(input);

      return service.update(
        id,
        input
      );

    },

    async deleteRole(
      id: number
    ): Promise<void> {

      await service.delete(id);

    }

  };

}
