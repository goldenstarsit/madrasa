import type {
  RouteDefinition
} from "./types.js";

export const healthRoute: RouteDefinition = {
  method: "GET",
  path: "/api/v1/health",

  async handler() {
    return {
      success: true,
      data: {
        status: "ok"
      }
    };
  }
};
