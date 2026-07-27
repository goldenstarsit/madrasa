import {
  AppError
} from "../../../core/errors/appError.js";


export function validationError(
  message: string
): AppError {

  return new AppError(
    "VALIDATION_ERROR",
    message
  );

}
