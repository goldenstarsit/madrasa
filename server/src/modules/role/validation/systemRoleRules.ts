export const protectedRoleNames = [
  "ADMIN",
  "SUPER_ADMIN"
] as const;


export function isProtectedRole(
  name: string
): boolean {

  return protectedRoleNames.includes(
    name.toUpperCase() as typeof protectedRoleNames[number]
  );

}


export function validateRoleDeletion(
  name: string
): {
  valid: boolean;
  message?: string;
} {

  if (isProtectedRole(name)) {
    return {
      valid: false,
      message: "Protected system role cannot be deleted"
    };
  }

  return {
    valid: true
  };

}
