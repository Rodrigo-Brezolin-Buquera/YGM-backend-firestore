import { ITokenService, UserCredentials } from "../../../common/services/common.ports";
import { IdDTO } from "../../../common/domain/common.id.dto";
import { capitalizeFirstLetter } from "../../../common/utils/common.utils.capitilizeName";
import { User } from "../domain/auth.Entity";
import { LoginDTO } from "../domain/DTOs/auth.login.dto";
import { SignupDTO } from "../domain/DTOs/auth.signup.dto";
import { AuthRepository } from "./auth.Repository";
import { LoginOutput } from "../domain/DTOs/auth.output.dto";

export class AuthBusiness {
  constructor(
    private authDB: AuthRepository,
    private tokenService: ITokenService
  ) {}

  public async login({ token }: LoginDTO): Promise<LoginOutput> {
    const {id} = await this.tokenService.verifyUserPermission(token) as UserCredentials;
    const payload = await this.authDB.login(id);
    return { userRole: payload.admin ? "admin" : "user" }
  }

  public async signup(input: SignupDTO): Promise<void> {
    const {token, name} = input
    const {id, email} = await this.tokenService.verifyUserPermission(token) as UserCredentials;

    const newUser = User.toModel({ 
      email, 
      id: id, 
      name: capitalizeFirstLetter(name)
    });
    await this.authDB.createUser(newUser);
  }

  public async findInactiveUsers(): Promise<User[]> {
    return await this.authDB.findInactiveUsers();
  }

  public async deleteUser({ id }: IdDTO): Promise<void> {
    await this.authDB.deleteUser(id);
    await this.authDB.deleteAccount(id)
  }

}
