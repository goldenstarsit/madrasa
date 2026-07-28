import type {
  CreateUserInput,
  UpdateUserInput
} from "../types/user.js";


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


function validateUsername(
  username: string
): ValidationResult {

  const value =
    username.trim();


  if (value.length === 0) {

    return failure(
      "Username is required"
    );

  }


  if (value.length < 3) {

    return failure(
      "Username must contain at least 3 characters"
    );

  }


  if (value.length > 50) {

    return failure(
      "Username cannot exceed 50 characters"
    );

  }


  return success();

}


function validateEmail(
  email: string | null | undefined
): ValidationResult {

  if (
    email === undefined ||
    email === null ||
    email.trim() === ""
  ) {

    return success();

  }


  const pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  if (!pattern.test(email)) {

    return failure(
      "Invalid email format"
    );

  }


  return success();

}


function validatePasswordHash(
  passwordHash: string
): ValidationResult {

  if (!passwordHash.trim()) {

    return failure(
      "Password hash is required"
    );

  }


  return success();

}


export function validateCreateUser(
  input: CreateUserInput
): ValidationResult {

  const username =
    validateUsername(
      input.username
    );

  if (!username.valid) {
    return username;
  }


  const email =
    validateEmail(
      input.email
    );

  if (!email.valid) {
    return email;
  }


  return validatePasswordHash(
    input.password_hash
  );

}


export function validateUpdateUser(
  input: UpdateUserInput
): ValidationResult {


  if (input.username !== undefined) {

    const username =
      validateUsername(
        input.username
      );

    if (!username.valid) {
      return username;
    }

  }


  return validateEmail(
    input.email
  );

}
