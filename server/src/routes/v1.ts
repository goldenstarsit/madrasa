import { Router } from "./index.js";

export const v1Router = new Router();

export function registerV1Routes(): Router {
  return v1Router;
}
