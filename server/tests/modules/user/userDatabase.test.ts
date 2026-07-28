import {
  UserRepository
} from "../../src/modules/user/repositories/userRepository.js";

async function runUserDatabaseTest(): Promise<void> {

  const repository =
    new UserRepository();

  const created =
    await repository.create({
      username: "db_test_user",
      email: "dbtest@example.com",
      password_hash: "hash",
      role_id: 1
    });

  console.log(
    "Created:",
    created.username
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
    found.username
  );

  const updated =
    await repository.update(
      created.id,
      {
        username: "db_test_user_updated",
        email: "updated@example.com"
      }
    );

  console.log(
    "Updated:",
    updated.username
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
    "User database CRUD verification completed"
  );

}

runUserDatabaseTest()
  .catch(
    (error) => {
      console.error(error);
      process.exit(1);
    }
  );
