import {
  Router
} from "../../routes/index.js";

import {
  RoleRepository
} from "./repositories/roleRepository.js";

import {
  RoleService
} from "./services/roleService.js";

import {
  createRoleHandlers
} from "./routes/roleHandlers.js";

import {
  createRoleRoutes
} from "./routes/roleRoutes.js";


async function runRoleRouteTest(): Promise<void> {

  const repository =
    new RoleRepository();

  const service =
    new RoleService(
      repository
    );

  const handlers =
    createRoleHandlers(
      service
    );

  const routes =
    createRoleRoutes(
      handlers
    );


  const router =
    new Router();


  for (const route of routes) {
    router.register(
      route
    );
  }


  const registeredRoutes =
    router.getRoutes();


  console.log(
    "Registered role routes:",
    registeredRoutes.map(
      route => `${route.method} ${route.path}`
    )
  );


  if (registeredRoutes.length !== 5) {
    throw new Error(
      "Role route registration failed"
    );
  }


  console.log(
    "Role route verification completed"
  );

}


runRoleRouteTest()
  .catch(
    (error) => {
      console.error(error);
      process.exit(1);
    }
  );
