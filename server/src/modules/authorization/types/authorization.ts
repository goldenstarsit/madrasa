export interface PermissionCheckInput {
  user_id: number;
  permission_code: string;
}

export interface PermissionCheckResult {
  allowed: boolean;
  permission_code: string;
}

export interface UserPermission {
  id: number;
  code: string;
  name: string;
  module: string;
}

export interface AuthorizationRepository {
  getUserPermissions(
    user_id: number
  ): Promise<UserPermission[]>;

  hasPermission(
    user_id: number,
    permission_code: string
  ): Promise<boolean>;
}

export interface AuthorizationServiceContract {
  can(
    input: PermissionCheckInput
  ): Promise<PermissionCheckResult>;

  getPermissions(
    user_id: number
  ): Promise<UserPermission[]>;
}
