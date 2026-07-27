import type {
  CreateRoleInput,
  UpdateRoleInput
} from "../types/role.js";

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

export function validateCreateRole(
  input: CreateRoleInput
): ValidationResult {

  const name = input.name.trim();

  if (name.length === 0) {
    return failure("Role name is required");
  }

  if (name.length < 3) {
    return failure("Role name must contain at least 3 characters");
  }

  if (name.length > 100) {
    return failure("Role name cannot exceed 100 characters");
  }

  return success();

}

export function validateUpdateRole(
  input: UpdateRoleInput
): ValidationResult {

  if (input.name === undefined) {
    return success();
  }

  return validateCreateRole(
    input.description === undefined
      ? {
          name: input.name
        }
      : {
          name: input.name,
          description: input.description
        }
  );

}
