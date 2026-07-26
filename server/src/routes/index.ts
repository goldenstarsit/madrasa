import type {
  RouteDefinition,
  RouterContract
} from "./types.js";

export class Router implements RouterContract {

  private readonly routes: RouteDefinition[] = [];

  register(
    route: RouteDefinition
  ): void {
    this.routes.push(route);
  }

  getRoutes(): RouteDefinition[] {
    return [...this.routes];
  }

}
