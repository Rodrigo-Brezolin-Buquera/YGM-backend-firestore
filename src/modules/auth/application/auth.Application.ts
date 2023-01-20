import { ITokenService } from "../../../common/aplication/common.ports";
import { CreateUserDTO, LoginDTO, UserIdDTO } from "../domain/auth.DTO";
import { User } from "../domain/auth.Entity";
import { IAuthMailerService, IAuthPasswordService } from "./auth.ports";
import { AuthRepository } from "./auth.Repository";

export class AuthApplication {
  constructor(
    private authInfrastructure: AuthRepository,
    private tokenService : ITokenService,
    private mailerService: IAuthMailerService,
    private passwordService: IAuthPasswordService
    ) {}

  public async login({ email, password }: LoginDTO): Promise<string> {
    const payload = await this.authInfrastructure.login(email, password);
    return this.tokenService.generateToken(payload)
  }

  public async createUser(input: CreateUserDTO): Promise<void> {
    const { email, token } = input;
    this.tokenService.verifyAdminPermission(token);
    const password = this.passwordService.passwordGenerator();
    
    const auth = User.toUser({ ...input, password });
    auth.checkEmail().checkName();

    await this.authInfrastructure.createUser(auth);
    await this.mailerService.sendPasswordToEmail(email, password);
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

    await this.mailerService.sendResetPasswordLink(email, resetLink);
  }
}
