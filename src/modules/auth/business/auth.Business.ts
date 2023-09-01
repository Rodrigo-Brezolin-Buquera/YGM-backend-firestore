import { ITokenService } from "../../../common/services/common.ports";
import { UserNotFound } from "../../../common/customError/notFound";
import { IdDTO } from "../../../common/domain/common.id.dto";
import { capitalizeFirstLetter } from "../../../common/utils/common.utils.capitilizeName";
import { User } from "../domain/auth.Entity";
import { EmailDTO } from "../domain/DTOs/auth.email.dto";
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

  public async signup(input: SignupDTO): Promise<string> {
    const {email, password, name} = input
    const payload = await this.authDB.signup(email, password);

    const newUser = User.toModel({ 
      email, 
      password, 
      id: payload.id, 
      name: capitalizeFirstLetter(name) 
    });
     await this.authDB.createUser(newUser);
    return this.tokenService.generateToken(payload)
  }

  public async findInactiveUsers(): Promise<User[]> {
    return await this.authDB.findInactiveUsers();
  }

  public async deleteUser({ id }: IdDTO): Promise<void> {
    await this.authDB.findUser(id);
    await this.authDB.deleteUser(id);
  }

  public async changePassword({ id }: IdDTO): Promise<void> {
    const user = await this.authDB.findUser(id);
    const email =  user.getEmail()
    await this.changeUserPassword({email})
  }

  public async changeUserPassword({ email }: EmailDTO): Promise<void> {
    const resetLink  = await this.authDB.changePassword(email);
    await this.mailerService.sendResetPasswordLink(email, resetLink);
  }
}
