import {
  Router
} from "../../src/routes/index.js";

import {
  UserRepository
} from "../../src/modules/user/repositories/userRepository.js";

import {
  UserService
} from "../../src/modules/user/services/userService.js";

import {
  createUserHandlers
} from "../../src/modules/user/routes/userHandlers.js";

import {
  createUserRoutes
} from "../../src/modules/user/routes/userRoutes.js";

async function runUserRouteTest(): Promise<void> {

  const repository =
    new UserRepository();

  const service =
    new UserService(
      repository
    );

  const handlers =
    createUserHandlers(
      service
    );

  const routes =
    createUserRoutes(
      handlers
    );

  const router =
    new Router();

  for (const route of routes) {
    router.register(route);
  }

  const registeredRoutes =
    router.getRoutes();

  console.log(
    "Registered user routes:",
    registeredRoutes.map(
      route => `${route.method} ${route.path}`
    )
  );

  if (registeredRoutes.length !== 5) {
    throw new Error(
      "User route registration failed"
    );
  }

  console.log(
    "User route verification completed"
  );

}

runUserRouteTest()
  .catch(
    (error) => {
      console.error(error);
      process.exit(1);
    }
  );
