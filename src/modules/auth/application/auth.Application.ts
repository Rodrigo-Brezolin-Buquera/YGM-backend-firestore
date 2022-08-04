import { CustomError } from "../../../common/customError/customError";
import { CreateUserDTO, LoginDTO, UserIdDTO } from "../domain/auth.DTO";
import { User } from "../domain/auth.Entity";
import {
  sendPasswordToEmail,
  sendResetPasswordLink,
} from "./auth.mailTransporter.service";
import { passwordGenerator } from "./auth.passwordGenerator.service";
import { AuthRepository } from "./auth.Repository";
import { generateToken } from "./auth.tokenGenerator.service";

export class AuthApplication {
  constructor(private authInfrastructure: AuthRepository) {}

  public async login({ token }: LoginDTO): Promise<string> {
    try {
      const payload = await this.authInfrastructure.login(token);
      return generateToken(payload);
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async createUser(input: CreateUserDTO): Promise<void> {
    try {
      const { id, name, email, token } = input;
      User.verifyAdminPermission(token);
      User.checkEmptyInput(input);
      const password = passwordGenerator();
      const auth = new User(
        email.trim(),
        password.trim(),
        name.trim(),
        id.trim()
      );

      auth.checkEmail().checkName();

      await this.authInfrastructure.createUser(auth);
      await sendPasswordToEmail(email, password);
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteUser({ id, token }: UserIdDTO): Promise<void> {
    try {
      User.verifyAdminPermission(token);
      User.checkId(id);
      await this.authInfrastructure.deleteUser(id.trim());
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async changePassword({ id, token }: UserIdDTO): Promise<void> {
    try {
      User.verifyAdminPermission(token);
      User.checkId(id);

      const { email, resetLink } = await this.authInfrastructure.changePassword(
        id.trim()
      );
      await sendResetPasswordLink(email, resetLink);
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}