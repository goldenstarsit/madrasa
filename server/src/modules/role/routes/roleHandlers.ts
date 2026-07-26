import type { RoleService } from "../services/roleService.js";

export interface RoleHandlers {
  readonly service: RoleService;
}

export function createRoleHandlers(
  service: RoleService
): RoleHandlers {
  return {
    service
  };
}
