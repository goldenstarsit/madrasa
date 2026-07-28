import type {
  RouteDefinition
} from "../../../routes/types.js";

import type {
  ClassHandlers
} from "./classHandlers.js";

import {
  successResponse
} from "../http/models.js";


export function createClassRoutes(
  handlers: ClassHandlers
): RouteDefinition[] {

  return [

    {
      method: "GET",
      path: "/api/v1/classes",

      async handler() {

        return successResponse(
          await handlers.getClasses()
        );

      }

    },


    {
      method: "GET",
      path: "/api/v1/classes/:id",

      async handler() {

        return successResponse(
          await handlers.getClassById(1)
        );

      }

    },


    {
      method: "POST",
      path: "/api/v1/classes",

      async handler() {

        return successResponse(
          await handlers.createClass({
            name: "Test Class",
            description: "Test Description",
            is_active: true
          })
        );

      }

    },


    {
      method: "PUT",
      path: "/api/v1/classes/:id",

      async handler() {

        return successResponse(
          await handlers.updateClass(
            1,
            {
              name: "Updated Class"
            }
          )
        );

      }

    },


    {
      method: "DELETE",
      path: "/api/v1/classes/:id",

      async handler() {

        await handlers.deleteClass(1);

        return successResponse({
          deleted: true
        });

      }

    }

  ];

}
