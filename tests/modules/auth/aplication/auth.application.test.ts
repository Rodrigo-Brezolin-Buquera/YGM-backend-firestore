import { AuthApplication } from "../../../../src/modules/auth/application/auth.Application";
import {
  CreateUserDTO,
  UserIdDTO,
} from "../../../../src/modules/auth/domain/auth.DTO";
import { TokenServiceMock } from "../../../common/application/mocks/common.token.service.mock";
import { AuthInfrastructureMock } from "./mocks/auth.infrastructure.mock";
import { AuthMailerServiceMock } from "./mocks/auth.mailer.service.mock";
import { AuthPasswordServiceMock } from "./mocks/auth.password.service.mock";

const authInfrastructureMock = new AuthInfrastructureMock();
const tokenService = new TokenServiceMock();
const authMailerServiceMock = new AuthMailerServiceMock();
const authPasswordServiceMock = new AuthPasswordServiceMock();

const authApplication = new AuthApplication(
  authInfrastructureMock,
  tokenService,
  authMailerServiceMock,
  authPasswordServiceMock
);

describe("Login tests - Auth Application", () => {
  test("Sucess case", async () => {
    expect.assertions(3);
    try {
      const result = await authApplication.login({ token: "token" });
      expect(result).toBe("Token");
      expect(tokenService.generateToken).toBeCalledTimes(1);
      expect(authInfrastructureMock.login).toBeCalledTimes(1);
    } catch (error: any) {}
  });
});

describe("CreateUsers tests - Auth Application", () => {
  test("Sucess case", async () => {
    const input: CreateUserDTO = {
      id: "id",
      email: "teste@teste.com.br",
      name: "teste teste",
      token: "token",
    };
    const result = await authApplication.createUser(input);
    expect(result).toBeUndefined();
    expect(tokenService.verifyAdminPermission).toBeCalled();
    expect(authPasswordServiceMock.passwordGenerator).toBeCalledTimes(1);
    expect(authMailerServiceMock.sendPasswordToEmail).toBeCalledTimes(1);
    expect(authInfrastructureMock.createUser).toBeCalledTimes(1);
  });
});

describe("DeleteUsers tests - Auth Application", () => {
  test("Sucess case", async () => {
    const input: UserIdDTO = {
      id: "id",
      token: "token",
    };
    const result = await authApplication.deleteUser(input);
    expect(result).toBeUndefined();
    expect(tokenService.verifyAdminPermission).toBeCalled();
    expect(authInfrastructureMock.deleteUser).toBeCalledTimes(1);
  });
});

describe("changePassword tests - Auth Application", () => {
  test("Sucess case", async () => {
    const input: UserIdDTO = {
      id: "id",
      token: "token",
    };
    const result = await authApplication.changePassword(input);
    expect(result).toBeUndefined();
    expect(tokenService.verifyAdminPermission).toBeCalled();
    expect(authInfrastructureMock.changePassword).toBeCalledTimes(1);
    expect(authMailerServiceMock.sendResetPasswordLink).toBeCalledTimes(1);
  });
});
