import { TokenService } from "../../../common/aplication/Common.Token.service";
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
  constructor(
    private authInfrastructure: AuthRepository,
    private tokenService : TokenService
  
    ) {}

  public async login({ token }: LoginDTO): Promise<string> {
    const payload = await this.authInfrastructure.login(token);
    return this.tokenService.generateToken(payload);
  }

  public async createUser(input: CreateUserDTO): Promise<void> {
    const { email, token } = input;
    this.tokenService.verifyAdminPermission(token);
    const password = passwordGenerator();
    
    const auth = User.toUser({ ...input, password });
    auth.checkEmail().checkName();

    await this.authInfrastructure.createUser(auth);
    await sendPasswordToEmail(email, password);
  }

  public async deleteUser({ id, token }: UserIdDTO): Promise<void> {
    this.tokenService.verifyAdminPermission(token);
    User.checkId(id);
    await this.authInfrastructure.deleteUser(id);
  }

  public async changePassword({ id, token }: UserIdDTO): Promise<void> {
    this.tokenService.verifyAdminPermission(token);
    User.checkId(id);

    const { email, resetLink } = await this.authInfrastructure.changePassword(
      id
    );

    await sendResetPasswordLink(email, resetLink);
  }
}
