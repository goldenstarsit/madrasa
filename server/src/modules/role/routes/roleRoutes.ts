import type {
  RouteDefinition
} from "../../../routes/types.js";

import type {
  RoleHandlers
} from "./roleHandlers.js";

import {
  successResponse
} from "../http/models.js";

export function createRoleRoutes(
  handlers: RoleHandlers
): RouteDefinition[] {

  return [

    {
      method: "GET",
      path: "/api/v1/roles",

      async handler() {
        return successResponse(
          await handlers.getRoles()
        );
      }

    },

    {
      method: "GET",
      path: "/api/v1/roles/:id",

      async handler() {
        return successResponse(
          await handlers.getRoleById(1)
        );
      }

    },

    {
      method: "POST",
      path: "/api/v1/roles",

      async handler() {
        return successResponse(
          await handlers.createRole({
            name: "Administrator",
            description: "System Administrator"
          })
        );
      }

    },

    {
      method: "PUT",
      path: "/api/v1/roles/:id",

      async handler() {
        return successResponse(
          await handlers.updateRole(
            1,
            {
              name: "Administrator",
              description: "Updated"
            }
          )
        );
      }

    },

    {
      method: "DELETE",
      path: "/api/v1/roles/:id",

      async handler() {

        await handlers.deleteRole(1);

        return successResponse({
          deleted: true
        });

      }

    }

  ];

}
