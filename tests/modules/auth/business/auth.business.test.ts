import { AuthBusiness } from "../../../../src/modules/auth/business/auth.Business";
import { SignupDTO } from "../../../../src/modules/auth/domain/DTOs/auth.signup.dto";
import { AuthDatabaseMock, userMock } from "./mocks/auth.database.mock";
import { AuthMailerServiceMock } from "./mocks/auth.mailer.service.mock";
import { TokenServiceMock } from "./mocks/common.token.mock";

const authDB = new AuthDatabaseMock();
const tokenService = new TokenServiceMock();
const authMailerServiceMock = new AuthMailerServiceMock();

const authBusiness = new AuthBusiness(
  authDB,
  tokenService,
  authMailerServiceMock
);

describe("Auth: Login method", () => {
  test("Sucess case", async () => {
      const result = await authBusiness.login({ email: "email", password:"senha"  });
      expect(result).toBe("Token");
      expect(tokenService.generateToken).toBeCalledTimes(1);
      expect(authDB.login).toBeCalledTimes(1);
  });
});

describe("Auth: Signup method", () => {
  test("Sucess case", async () => {
    const input:SignupDTO = {
      email: "teste@teste.com.br",
      name: "teste teste",
      password: "12356"
    };
    const result = await authBusiness.signup(input);
    expect(result).toEqual("Token");
    expect(tokenService.generateToken).toBeCalledTimes(1);
    expect(authDB.signup).toBeCalledTimes(1);
    expect(authDB.createUser).toBeCalledTimes(1);
  });
});

describe("Auth: FindInactiveUser method", () => {
  test("Sucess case", async () => {
    const result = await authBusiness.findInactiveUsers();
    expect(result).toContainEqual(userMock);
  });
});

describe("Auth: Delete method", () => {
  test("Sucess case", async () => {
    const result = await authBusiness.deleteUser({id: "id"});
    expect(result).toBeUndefined();
    expect(authDB.findUser).toBeCalledTimes(1);
    expect(authDB.deleteUser).toBeCalledTimes(1);
  });
});


describe("Auth: ChangePassword method", () => {
  test("Sucess case", async () => {
    const result = await authBusiness.changePassword({id: "id"});
    expect(result).toBeUndefined();
    expect(authDB.changePassword).toBeCalledTimes(1);
    expect(authMailerServiceMock.sendResetPasswordLink).toBeCalledTimes(1);
  });
});

describe("Auth: ChangeUserPassword method", () => {
  test("Sucess case", async () => {
    const result = await authBusiness.changeUserPassword({email: "email"});
    expect(result).toBeUndefined();
    expect(authDB.changePassword).toBeCalledTimes(1);
    expect(authMailerServiceMock.sendResetPasswordLink).toBeCalledTimes(1);
  });
});
