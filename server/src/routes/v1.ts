import { Router } from "./index.js";

import { RoleRepository } from "../modules/role/repositories/roleRepository.js";
import { StudentRepository } from "../modules/student/repositories/studentRepository.js";
import { UserRepository } from "../modules/user/repositories/userRepository.js";
import { RoleService } from "../modules/role/services/roleService.js";
import { StudentService } from "../modules/student/services/studentService.js";
import { UserService } from "../modules/user/services/userService.js";

import {
  createRoleHandlers
} from "../modules/role/routes/roleHandlers.js";
import {
  createUserHandlers
} from "../modules/user/routes/userHandlers.js";

import {
  createRoleRoutes
} from "../modules/role/routes/roleRoutes.js";

import {
  createStudentHandlers,
  createStudentRoutes
} from "../modules/student/routes/index.js";
import {
  createUserRoutes
} from "../modules/user/routes/userRoutes.js";

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

  const userRepository =
    new UserRepository();

  const userService =
    new UserService(
      userRepository
    );

  const userHandlers =
    createUserHandlers(
      userService
    );

  const userRoutes =
    createUserRoutes(
      userHandlers
    );

  for (const route of userRoutes) {
    v1Router.register(route);
  }

  const studentRepository =
    new StudentRepository();

  const studentService =
    new StudentService(
      studentRepository
    );

  const studentHandlers =
    createStudentHandlers(
      studentService
    );

  const studentRoutes =
    createStudentRoutes(
      studentHandlers
    );

  for (const route of studentRoutes) {
    v1Router.register(route);
  }

  return v1Router;
}
