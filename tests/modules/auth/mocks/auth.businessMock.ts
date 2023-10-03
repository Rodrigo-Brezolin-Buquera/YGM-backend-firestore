import { IdDTO } from "../../../../src/common/domain/common.id.dto";
import { ITokenService } from "../../../../src/common/services/common.ports";
import { IAuthMailerService } from "../../../../src/modules/auth/business/auth.ports";
import { AuthRepository } from "../../../../src/modules/auth/business/auth.Repository";
import { User } from "../../../../src/modules/auth/domain/auth.Entity";
import { EmailDTO } from "../../../../src/modules/auth/domain/DTOs/auth.email.dto";
import { LoginDTO } from "../../../../src/modules/auth/domain/DTOs/auth.login.dto";
import { LoginOutput } from "../../../../src/modules/auth/domain/DTOs/auth.output.dto";
import { SignupDTO } from "../../../../src/modules/auth/domain/DTOs/auth.signup.dto";
import { userMock } from "./auth.userMock";



export class AuthBusinessMock {
  constructor(
    private authDB: AuthRepository,
    private tokenService: ITokenService,
    private mailerService: IAuthMailerService
  ) {}

  public login = jest.fn(
    async ({ token}: LoginDTO): Promise<LoginOutput> => {
      return {userRole: "admin"}
    }
  );

  public signup = jest.fn(async (input: SignupDTO): Promise<string> => "token");

  public findInactiveUsers = jest.fn(async (): Promise<User[]> => [userMock]);

  public deleteUser = jest.fn(async ({ id }: IdDTO): Promise<void> => {});

  public changePassword = jest.fn(async ({ id }: IdDTO): Promise<void> => {});

  public changeUserPassword = jest.fn(
    async ({ email }: EmailDTO): Promise<void> => {}
  );
}
