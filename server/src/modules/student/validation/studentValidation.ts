import type {
  CreateStudentInput,
  UpdateStudentInput
} from "../types/student.js";

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

function success(): ValidationResult {
  return {
    valid: true
  };
}

function failure(
  message: string
): ValidationResult {
  return {
    valid: false,
    message
  };
}

function validateAdmissionNo(
  admissionNo: string
): ValidationResult {

  const value =
    admissionNo.trim();

  if (!value) {
    return failure(
      "Admission number is required"
    );
  }

  if (value.length < 2) {
    return failure(
      "Admission number must contain at least 2 characters"
    );
  }

  if (value.length > 50) {
    return failure(
      "Admission number cannot exceed 50 characters"
    );
  }

  return success();

}

function validateName(
  value: string,
  field: string
): ValidationResult {

  const text =
    value.trim();

  if (!text) {
    return failure(
      field + " is required"
    );
  }

  if (text.length > 100) {
    return failure(
      field + " cannot exceed 100 characters"
    );
  }

  return success();

}

export function validateCreateStudent(
  input: CreateStudentInput
): ValidationResult {

  let result =
    validateAdmissionNo(
      input.admission_no
    );

  if (!result.valid) {
    return result;
  }

  result =
    validateName(
      input.full_name,
      "Full name"
    );

  if (!result.valid) {
    return result;
  }

  return validateName(
    input.father_name,
    "Father name"
  );

}

export function validateUpdateStudent(
  input: UpdateStudentInput
): ValidationResult {

  if (input.admission_no !== undefined) {

    const result =
      validateAdmissionNo(
        input.admission_no
      );

    if (!result.valid) {
      return result;
    }

  }

  if (input.full_name !== undefined) {

    const result =
      validateName(
        input.full_name,
        "Full name"
      );

    if (!result.valid) {
      return result;
    }

  }

  if (input.father_name !== undefined) {

    const result =
      validateName(
        input.father_name,
        "Father name"
      );

    if (!result.valid) {
      return result;
    }

  }

  return success();

}
