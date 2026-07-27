import type {
  CreateRoleInput,
  Role,
  UpdateRoleInput
} from "../types/role.js";

export interface CreateRoleRequest {
  body: CreateRoleInput;
}

export interface UpdateRoleRequest {
  params: {
    id: number;
  };
  body: UpdateRoleInput;
}

export interface GetRoleRequest {
  params: {
    id: number;
  };
}

export interface ListRolesRequest {
  query?: {
    name?: string;
  };
}

export interface DeleteRoleRequest {
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
