import {
  RoleRepository
} from "./repositories/roleRepository.js";


async function runRoleDatabaseTest(): Promise<void> {

  const repository =
    new RoleRepository();


  const created =
    await repository.create({
      name: "DB_TEST_ROLE",
      description: "Database CRUD test"
    });


  console.log(
    "Created:",
    created.name
  );


  const found =
    await repository.findById(
      created.id
    );


  if (!found) {
    throw new Error(
      "Find operation failed"
    );
  }


  console.log(
    "Found:",
    found.name
  );


  const updated =
    await repository.update(
      created.id,
      {
        name: "DB_TEST_ROLE_UPDATED",
        description: "Updated database test"
      }
    );


  console.log(
    "Updated:",
    updated.name
  );


  await repository.delete(
    created.id
  );


  const deleted =
    await repository.findById(
      created.id
    );


  if (deleted) {
    throw new Error(
      "Delete operation failed"
    );
  }


  console.log(
    "Database CRUD verification completed"
  );

}


runRoleDatabaseTest()
  .catch(
    (error) => {
      console.error(error);
      process.exit(1);
    }
  );
