import {
  StudentRepository
} from "../../src/modules/student/repositories/studentRepository.js";


async function runStudentDatabaseTest(): Promise<void> {

  const repository =
    new StudentRepository();


  const created =
    await repository.create({
      admission_no: "DB-TEST-001",
      full_name: "Database Student",
      father_name: "Database Father",
      date_of_birth: null,
      phone: null,
      address: null,
      role_id: 1
    });


  console.log(
    "Created:",
    created.admission_no
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
    found.full_name
  );


  const updated =
    await repository.update(
      created.id,
      {
        full_name: "Updated Database Student"
      }
    );


  console.log(
    "Updated:",
    updated.full_name
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
    "Student database CRUD verification completed"
  );

}


runStudentDatabaseTest()
  .catch(
    error => {
      console.error(error);
      process.exit(1);
    }
  );
