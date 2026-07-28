import {
  StudentRepository
} from "../../src/modules/student/repositories/studentRepository.js";

import {
  StudentService
} from "../../src/modules/student/services/studentService.js";


async function runStudentServiceTest(): Promise<void> {

  const repository =
    new StudentRepository();

  const service =
    new StudentService(
      repository
    );


  const student =
    await service.create({
      admission_no: "TEST-001",
      full_name: "Test Student",
      father_name: "Test Father",
      date_of_birth: null,
      phone: null,
      address: null,
      role_id: 1
    });


  console.log(
    "Created student:",
    student.full_name
  );


  const found =
    await service.getByAdmissionNo(
      "TEST-001"
    );


  if (!found) {
    throw new Error(
      "Student lookup failed"
    );
  }


  console.log(
    "Found student:",
    found.full_name
  );


  await service.delete(
    found.id
  );


  console.log(
    "Student service test completed"
  );

}


runStudentServiceTest()
  .catch(
    error => {
      console.error(error);
      process.exit(1);
    }
  );
