import { ITokenService } from "../../../common/aplication/common.ports";
import { IdDTO } from "../../../common/domain/common.id.dto";
import { User } from "../domain/auth.Entity";
import { LoginDTO } from "../domain/DTOs/auth.login.dto";
import { SignupDTO } from "../domain/DTOs/auth.signup.dto";
import { IAuthMailerService } from "./auth.ports";
import { AuthRepository } from "./auth.Repository";

export class AuthBusiness {
  constructor(
    private authDB: AuthRepository,
    private tokenService: ITokenService,
    private mailerService: IAuthMailerService
  ) {}

  public async login({ email, password }: LoginDTO): Promise<string> {
    const payload = await this.authDB.login(email, password);
    return this.tokenService.generateToken(payload);
  }

  public async signup(input: SignupDTO): Promise<void> {
    const id = this.authDB.signup(input.email, input.password);
    const newUser = User.toModel({ ...input, id });
    await this.authDB.createUser(newUser);
  }

  public async deleteUser({ id }: IdDTO): Promise<void> {
    await this.authDB.deleteUser(id);
  }

  public async changePassword({ id }: IdDTO): Promise<void> {
    const { email, resetLink } = await this.authDB.changePassword(id);
    await this.mailerService.sendResetPasswordLink(email, resetLink);
  }
}
