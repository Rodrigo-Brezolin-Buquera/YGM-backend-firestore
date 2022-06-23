import { CustomError } from "../../../common/customError/customError";
import { CreateUserDTO, LoginDTO, UserIdDTO } from "../domain/auth.DTO";
import { User } from "../domain/auth.Entity";
import { sendPasswordToEmail } from "./auth.mailTransporter.service";
import { passwordGenerator } from "./auth.passwordGenerator.service";
import { AuthRepository } from "./auth.Repository";

export class AuthApplication {
  constructor(private authInfrastructure: AuthRepository) {}

  public async login({ token }: LoginDTO): Promise<string> {
    try {
      const customToken = await this.authInfrastructure.login(token);
      return customToken;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async createUser({ id, name, email }: CreateUserDTO): Promise<void> {
    try {
      const password = passwordGenerator();
      const auth = new User(email, password, name, id);

      auth.checkEmail().checkName();

      await this.authInfrastructure.createUser(auth);

      await sendPasswordToEmail(email, password);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteUser({ id }: UserIdDTO): Promise<void> {
    try {
      await this.authInfrastructure.deleteUser(id);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
