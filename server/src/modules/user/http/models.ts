import type {
  CreateUserInput,
  User,
  UpdateUserInput
} from "../types/user.js";

export interface CreateUserRequest {
  body: CreateUserInput;
}

export interface UpdateUserRequest {
  params: {
    id: number;
  };
  body: UpdateUserInput;
}

export interface GetUserRequest {
  params: {
    id: number;
  };
}

export interface ListUsersRequest {
  query?: {
    name?: string;
  };
}

export interface DeleteUserRequest {
  params: {
    id: number;
  };
}

export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}

export type ApiResult<T> =
  | ApiResponse<T>
  | ApiErrorResponse;

export function successResponse<T>(
  data: T
): ApiResponse<T> {
  return {
    success: true,
    data
  };
}

export function errorResponse(
  message: string
): ApiErrorResponse {
  return {
    success: false,
    message
  };
}

export async function execute<T>(
  action: () => Promise<T>
): Promise<ApiResult<T>> {

  try {

    return successResponse(
      await action()
    );

  } catch (error) {

    return errorResponse(
      error instanceof Error
        ? error.message
        : "Internal server error"
    );

  }

}
