import { IdDTO } from "../../../../src/common/domain/common.id.dto";
import { ITokenService } from "../../../../src/common/services/common.ports";
import { AuthRepository } from "../../../../src/modules/auth/business/auth.Repository";
import { User } from "../../../../src/modules/auth/domain/auth.Entity";
import { LoginDTO } from "../../../../src/modules/auth/domain/DTOs/auth.login.dto";
import { LoginOutput } from "../../../../src/modules/auth/domain/DTOs/auth.output.dto";
import { SignupDTO } from "../../../../src/modules/auth/domain/DTOs/auth.signup.dto";
import { userMock } from "./auth.userMock";



export class AuthBusinessMock {
  constructor(
    private authDB: AuthRepository,
    private tokenService: ITokenService,
  ) {}

  public login = jest.fn(
    async ({ token}: LoginDTO): Promise<LoginOutput> => {
      return {userRole: "admin"}
    }
  );

  public signup = jest.fn(async (input: SignupDTO): Promise<string> => "token");

  public findInactiveUsers = jest.fn(async (): Promise<User[]> => [userMock]);

  public deleteUser = jest.fn(async ({ id }: IdDTO): Promise<void> => {});
}
