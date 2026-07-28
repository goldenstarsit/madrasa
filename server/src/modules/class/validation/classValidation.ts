import type {
  CreateClassInput,
  UpdateClassInput
} from "../types/class.js";


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


function validateName(
  name: string
): ValidationResult {

  const value =
    name.trim();


  if (!value) {

    return failure(
      "Class name is required"
    );

  }


  if (value.length < 2) {

    return failure(
      "Class name must contain at least 2 characters"
    );

  }


  if (value.length > 100) {

    return failure(
      "Class name cannot exceed 100 characters"
    );

  }


  return success();

}


export function validateCreateClass(
  input: CreateClassInput
): ValidationResult {

  return validateName(
    input.name
  );

}


export function validateUpdateClass(
  input: UpdateClassInput
): ValidationResult {


  if (input.name !== undefined) {

    return validateName(
      input.name
    );

  }


  return success();

}
