import type {
  RequestContext
} from "../middleware/types.js";

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

export interface RouteHandler {
  (
    context: RequestContext
  ): Promise<void> | void;
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
