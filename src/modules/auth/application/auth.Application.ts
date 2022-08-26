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
    const payload = await this.authInfrastructure.login(token);
    return generateToken(payload);
  }

  public async createUser(input: CreateUserDTO): Promise<void> {
    const { id, name, email, token } = input;
    User.verifyAdminPermission(token);
    const password = passwordGenerator();
    const auth = new User(
      email,
      password,
      name,
      id
    );

    auth.checkEmail().checkName();

    await this.authInfrastructure.createUser(auth);
    await sendPasswordToEmail(email, password);
  }

  public async deleteUser({ id, token }: UserIdDTO): Promise<void> {
    User.verifyAdminPermission(token);
    User.checkId(id);
    await this.authInfrastructure.deleteUser(id);
  }

  public async changePassword({ id, token }: UserIdDTO): Promise<void> {
    User.verifyAdminPermission(token);
    User.checkId(id);

    const { email, resetLink } = await this.authInfrastructure.changePassword(
      id
    );

    await sendResetPasswordLink(email, resetLink);
  }
}
