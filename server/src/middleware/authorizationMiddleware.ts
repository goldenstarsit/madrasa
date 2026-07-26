import type {
  Middleware,
  PermissionRequirement
} from "./types.js";

import type {
  AuthorizationServiceContract
} from "../modules/authorization/types/authorization.js";


export function authorizationMiddleware(
  service: AuthorizationServiceContract,
  requirement: PermissionRequirement
): Middleware {

  return async (
    context,
    next
  ): Promise<void> => {

    if (!context.user) {
      throw new Error(
        "Authentication required"
      );
    }

    const result =
      await service.can({
        user_id: context.user.id,
        permission_code: requirement.permission_code
      });

    if (!result.allowed) {
      throw new Error(
        "Permission denied"
      );
    }

    await next();
  };

}
