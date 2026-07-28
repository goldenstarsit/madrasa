import type {
  RouteDefinition
} from "../../../routes/types.js";

import type {
  StudentHandlers
} from "./studentHandlers.js";

import {
  successResponse
} from "../http/models.js";

export function createStudentRoutes(
  handlers: StudentHandlers
): RouteDefinition[] {

  return [

    {
      method: "GET",
      path: "/api/v1/students",

      async handler() {
        return successResponse(
          await handlers.getStudents()
        );
      }

    },

    {
      method: "GET",
      path: "/api/v1/students/:id",

      async handler() {
        return successResponse(
          await handlers.getStudentById(1)
        );
      }

    },

    {
      method: "POST",
      path: "/api/v1/students",

      async handler() {
        return successResponse(
          await handlers.createStudent({
            admission_no: "STD-001",
            full_name: "Test Student",
            father_name: "Test Father",
            date_of_birth: null,
            phone: null,
            address: null,
            role_id: 1,
            is_active: true
          })
        );
      }

    },

    {
      method: "PUT",
      path: "/api/v1/students/:id",

      async handler() {
        return successResponse(
          await handlers.updateStudent(
            1,
            {
              full_name: "Updated Student"
            }
          )
        );
      }

    },

    {
      method: "DELETE",
      path: "/api/v1/students/:id",

      async handler() {

        await handlers.deleteStudent(1);

        return successResponse({
          deleted: true
        });

      }

    }

  ];

}
