import {
  RoleRepository
} from "./repositories/roleRepository.js";

import {
  RoleService
} from "./services/roleService.js";


async function runRoleTest(): Promise<void> {

  const repository =
    new RoleRepository();

  const service =
    new RoleService(
      repository
    );


  const role =
    await service.create({
      name: "TEST_ROLE",
      description: "Integration test role"
    });


  console.log(
    "Created role:",
    role
  );


  const found =
    await service.getByName(
      "TEST_ROLE"
    );


  console.log(
    "Found role:",
    found
  );


  if (!found) {
    throw new Error(
      "Role test failed"
    );
  }


  await service.delete(
    found.id
  );


  console.log(
    "Role integration test completed"
  );

}


runRoleTest()
  .catch(
    (error) => {
      console.error(error);
      process.exit(1);
    }
  );
