export interface RequestUser {
  id: number;
  username: string;
  role_id: number | null;
}

export interface RequestContext {
  user: RequestUser | null;
}

export interface PermissionRequirement {
  permission_code: string;
}

export interface MiddlewareNext {
  (): Promise<void> | void;
}

export interface Middleware {
  (
    context: RequestContext,
    next: MiddlewareNext
  ): Promise<void> | void;
}
