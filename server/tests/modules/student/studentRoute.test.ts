import {
  Router
} from "../../src/routes/index.js";

import {
  StudentRepository
} from "../../src/modules/student/repositories/studentRepository.js";

import {
  StudentService
} from "../../src/modules/student/services/studentService.js";

import {
  createStudentHandlers,
  createStudentRoutes
} from "../../src/modules/student/routes/index.js";


async function runStudentRouteTest(): Promise<void> {

  const repository =
    new StudentRepository();


  const service =
    new StudentService(
      repository
    );


  const handlers =
    createStudentHandlers(
      service
    );


  const routes =
    createStudentRoutes(
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
    "Registered student routes:",
    registeredRoutes.map(
      route =>
        `${route.method} ${route.path}`
    )
  );


  if (registeredRoutes.length !== 5) {
    throw new Error(
      "Student route registration failed"
    );
  }


  console.log(
    "Student route verification completed"
  );

}


runStudentRouteTest()
  .catch(
    error => {
      console.error(error);
      process.exit(1);
    }
  );
