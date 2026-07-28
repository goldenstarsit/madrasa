import {
  UserRepository
} from "../../src/modules/user/repositories/userRepository.js";

import {
  UserService
} from "../../src/modules/user/services/userService.js";


async function runUserServiceTest(): Promise<void> {

  const repository =
    new UserRepository();


  const service =
    new UserService(
      repository
    );


  const user =
    await service.create({
      username: "test_user",
      email: "test@example.com",
      password_hash: "hash",
      role_id: 1
    });


  console.log(
    "Created user:",
    user.username
  );


  const found =
    await service.getByUsername(
      "test_user"
    );


  if (!found) {
    throw new Error(
      "User lookup failed"
    );
  }


  console.log(
    "Found user:",
    found.username
  );


  await service.delete(
    found.id
  );


  console.log(
    "User service test completed"
  );

}


runUserServiceTest()
  .catch(
    (error) => {
      console.error(error);
      process.exit(1);
    }
  );
