import type {
  RequestContext
} from "../middleware/types.js";

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

export interface RouteResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface RouteHandler {
  (
    context: RequestContext
  ): RouteResponse | Promise<RouteResponse>;
}

export interface RouteDefinition {
  method: HttpMethod;
  path: string;
  handler: RouteHandler;
}

export interface RouterContract {
  register(
    route: RouteDefinition
  ): void;

  getRoutes(): RouteDefinition[];
}
