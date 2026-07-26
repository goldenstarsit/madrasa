import type {
  AuthorizationRepository,
  AuthorizationServiceContract,
  PermissionCheckInput,
  PermissionCheckResult,
  UserPermission
} from "../types/authorization.js";


export class AuthorizationService
  implements AuthorizationServiceContract {

  constructor(
    private readonly repository: AuthorizationRepository
  ) {}


  async can(
    input: PermissionCheckInput
  ): Promise<PermissionCheckResult> {

    const allowed =
      await this.repository.hasPermission(
        input.user_id,
        input.permission_code
      );

    return {
      allowed,
      permission_code: input.permission_code
    };
  }


  async getPermissions(
    user_id: number
  ): Promise<UserPermission[]> {

    return this.repository.getUserPermissions(
      user_id
    );
  }

}
