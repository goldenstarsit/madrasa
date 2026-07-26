import { Router } from "./routes/index.js";
import { registerV1Routes } from "./routes/v1.js";

import {
  createRequestContext
} from "./middleware/requestContext.js";

import type {
  Middleware
} from "./middleware/types.js";


export function createApp(): Router {

  const router = new Router();

  const middlewares: Middleware[] = [];

  const context = createRequestContext();

  for (const middleware of middlewares) {
    middleware(
      context,
      async () => {}
    );
  }

  const v1Router = registerV1Routes();

  for (const route of v1Router.getRoutes()) {
    router.register(route);
  }

  return router;
}
