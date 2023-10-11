import { AuthBusiness } from "../../../../src/modules/auth/business/auth.Business";
import { SignupDTO } from "../../../../src/modules/auth/domain/DTOs/auth.signup.dto";
import { AuthDatabaseMock } from "../mocks/auth.database.mock";
import { userMock } from "../mocks/auth.userMock";
import { TokenServiceMock } from "../mocks/common.token.mock";

const authDB = new AuthDatabaseMock();
const tokenService = new TokenServiceMock();

const authBusiness = new AuthBusiness(
  authDB,
  tokenService,
);

describe("AuthBusiness: Login method", () => {
  test("Sucess case", async () => {
      const result = await authBusiness.login({ token: "token" });
      expect(result).toEqual({userRole: "admin"});
      expect(tokenService.verifyUserPermission).toBeCalledTimes(1)
      expect(authDB.login).toBeCalledTimes(1);
  });
});

describe("AuthBusiness: Signup method", () => {
  test("Sucess case", async () => {
    const input:SignupDTO = {
      name: "teste",
      token: "token" 
    };
    const result = await authBusiness.signup(input);
    expect(result).toBeUndefined();
    expect(tokenService.verifyUserPermission).toBeCalledTimes(1)
    expect(authDB.createUser).toBeCalledTimes(1);
  });
});


describe("AuthBusiness: FindInactiveUser method", () => {
  test("Sucess case", async () => {
    const result = await authBusiness.findInactiveUsers();
    expect(result).toContainEqual(userMock);
  });
});

describe("AuthBusiness: Delete method", () => {
  test("Sucess case", async () => {
    const result = await authBusiness.deleteUser({id: "id"});
    expect(result).toBeUndefined();
    expect(authDB.deleteUser).toBeCalledTimes(1);
    expect(authDB.deleteAccount).toBeCalledTimes(1);

  });
});


