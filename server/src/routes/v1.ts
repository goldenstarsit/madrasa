import { Router } from "./index.js";

import { RoleRepository } from "../modules/role/repositories/roleRepository.js";
import { RoleService } from "../modules/role/services/roleService.js";

import {
  createRoleHandlers
} from "../modules/role/routes/roleHandlers.js";

import {
  createRoleRoutes
} from "../modules/role/routes/roleRoutes.js";

export const v1Router = new Router();

export function registerV1Routes(): Router {

  const roleRepository =
    new RoleRepository();

  const roleService =
    new RoleService(
      roleRepository
    );

  const roleHandlers =
    createRoleHandlers(
      roleService
    );

  const roleRoutes =
    createRoleRoutes(
      roleHandlers
    );

  for (const route of roleRoutes) {
    v1Router.register(route);
  }

  return v1Router;
}
