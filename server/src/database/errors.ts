export class DatabaseError extends Error {

  public readonly cause?: unknown;


  constructor(
    message: string,
    cause?: unknown
  ) {

    super(message);

    this.name = "DatabaseError";

    this.cause = cause;

  }

}


export function createDatabaseError(
  error: unknown
): DatabaseError {

  if (error instanceof DatabaseError) {
    return error;
  }


  if (error instanceof Error) {

    return new DatabaseError(
      error.message,
      error
    );

  }


  return new DatabaseError(
    "Unknown database error",
    error
  );

}
