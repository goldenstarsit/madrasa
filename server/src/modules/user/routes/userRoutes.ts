import type {
  RouteDefinition
} from "../../../routes/types.js";

import type {
  UserHandlers
} from "./userHandlers.js";

import {
  successResponse
} from "../http/models.js";

export function createUserRoutes(
  handlers: UserHandlers
): RouteDefinition[] {

  return [

    {
      method: "GET",
      path: "/api/v1/users",

      async handler() {
        return successResponse(
          await handlers.getUsers()
        );
      }

    },

    {
      method: "GET",
      path: "/api/v1/users/:id",

      async handler() {
        return successResponse(
          await handlers.getUserById(1)
        );
      }

    },

    {
      method: "POST",
      path: "/api/v1/users",

      async handler() {
        return successResponse(
          await handlers.createUser({
            username: "admin",
            email: "admin@example.com",
            password_hash: "hashed-password",
            role_id: 1
          })
        );
      }

    },

    {
      method: "PUT",
      path: "/api/v1/users/:id",

      async handler() {
        return successResponse(
          await handlers.updateUser(
            1,
            {
              username: "admin",
              email: "admin@example.com"
            }
          )
        );
      }

    },

    {
      method: "DELETE",
      path: "/api/v1/users/:id",

      async handler() {
        await handlers.deleteUser(1);

        return successResponse({
          deleted: true
        });
      }

    }

  ];

}
