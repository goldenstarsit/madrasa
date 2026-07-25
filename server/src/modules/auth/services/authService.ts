import type {
  LoginInput,
  AuthResult,
  AuthRepository as AuthRepositoryContract
} from "../types/auth.js";


export class AuthService {

  constructor(
    private readonly repository: AuthRepositoryContract
  ) {}


  async login(
    input: LoginInput
  ): Promise<AuthResult> {

    const user =
      await this.repository.findUserForLogin(
        input.username
      );


    if (!user) {
      throw new Error(
        "Invalid username or password"
      );
    }


    if (!user.is_active) {
      throw new Error(
        "User account is inactive"
      );
    }


    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role_id: user.role_id
      }
    };
  }
}
