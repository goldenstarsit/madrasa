export const protectedUsernames = [
  "ADMIN",
  "SUPER_ADMIN"
] as const;


export function isProtectedUser(
  username: string
): boolean {

  return protectedUsernames.includes(
    username.toUpperCase() as typeof protectedUsernames[number]
  );

}


export function validateUserDeletion(
  username: string
): {
  valid: boolean;
  message?: string;
} {

  if (isProtectedUser(username)) {

    return {
      valid: false,
      message: "Protected system user cannot be deleted"
    };

  }


  return {
    valid: true
  };

}


export function validateUserActivation(
  username: string,
  isActive: boolean
): {
  valid: boolean;
  message?: string;
} {

  if (
    isProtectedUser(username) &&
    !isActive
  ) {

    return {
      valid: false,
      message: "Protected system user cannot be deactivated"
    };

  }


  return {
    valid: true
  };

}
