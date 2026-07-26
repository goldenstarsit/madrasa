import type {
  RouteDefinition
} from "../../../routes/types.js";

import type {
  RoleHandlers
} from "./roleHandlers.js";

export function createRoleRoutes(
  _handlers: RoleHandlers
): RouteDefinition[] {

  return [
    {
      method: "GET",
      path: "/api/v1/roles",

      async handler(): Promise<void> {
        return;
      }
    },

    {
      method: "GET",
      path: "/api/v1/roles/:id",

      async handler(): Promise<void> {
        return;
      }
    },

    {
      method: "POST",
      path: "/api/v1/roles",

      async handler(): Promise<void> {
        return;
      }
    },

    {
      method: "PUT",
      path: "/api/v1/roles/:id",

      async handler(): Promise<void> {
        return;
      }
    },

    {
      method: "DELETE",
      path: "/api/v1/roles/:id",

      async handler(): Promise<void> {
        return;
      }
    }
  ];
}
