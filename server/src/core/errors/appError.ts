export type ErrorCode =
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "DUPLICATE_ENTRY"
  | "FORBIDDEN"
  | "INTERNAL_ERROR";


export class AppError extends Error {

  readonly code: ErrorCode;

  constructor(
    code: ErrorCode,
    message: string
  ) {

    super(message);

    this.code = code;

    this.name = "AppError";
  }

}
