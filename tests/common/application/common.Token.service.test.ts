import {
  Payload,
  TokenService,
} from "../../../src/common/aplication/common.Token.service";
import {
  InvalidSignature,
  TokenExpired,
} from "../../../src/common/customError/unauthorized";

const tokenService = new TokenService();
let token: any = "";

describe("TokenService - sucess cases tests on common application ", () => {
  let token: string;

  test("GenerateToken sucess case with correct payload ", () => {
    expect.assertions(1);
    try {
      const payload: Payload = {
        id: "ID",
        admin: true,
      };
      token = tokenService.generateToken(payload);
      expect(token).toBeDefined();
    } catch (error: any) {}
  });

  test("GetTokenId sucess case  ", () => {
    expect.assertions(2);
    try {
      const result = tokenService.getTokenId(token);
      expect(result).toBeDefined();
      expect(result).toBe("ID");
    } catch (error: any) {}
  });

  test("VerifyUserPermission sucess case  ", () => {
    expect.assertions(0);
    try {
      tokenService.verifyUserPermission(token);
    } catch (error: any) {
      expect(error).toBeUndefined();
    }
  });

  test("VerifyAdminPermission sucess case  ", () => {
    expect.assertions(0);
    try {
      tokenService.verifyAdminPermission(token);
    } catch (error: any) {
      expect(error).toBeUndefined();
    }
  });
});

describe("TokenService - VerifyAdminPermission errors tests on common application ", () => {
  test(" Fail case with empty string ", () => {
    const currentError = new InvalidSignature();
    expect.assertions(3);
    try {
      tokenService.verifyAdminPermission(token);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test(" Fail case with wrong string ", () => {
    const currentError = new InvalidSignature();
    token = "uewbfuibqwufba";
    expect.assertions(3);
    try {
      tokenService.verifyAdminPermission(token);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test(" Fail case with no token ", () => {
    const currentError = new InvalidSignature();
    token = undefined;
    expect.assertions(3);
    try {
      tokenService.verifyAdminPermission(token);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test(" Fail case with expired token ", () => {
    const currentError = new TokenExpired();
    token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRQWUNqNzZ0QTRYQ0dyd05WYTB3ajd4ajR6MzMiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjU5NTI0MTAzLCJleHAiOjE2NTk1Mjc3MDN9.2elbDew5kB8qWVra7yzOddR1ik_zzOq4y4jQ37vpiqM";
    expect.assertions(3);
    try {
      tokenService.verifyAdminPermission(token);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });
});

describe("TokenService - VerifyUserPermission errors tests on common application ", () => {
  test(" Fail case with empty string ", () => {
    const currentError = new TokenExpired();
    expect.assertions(3);
    try {
      tokenService.verifyUserPermission(token);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test(" Fail case with wrong string ", () => {
    const currentError = new InvalidSignature();
    token = "uewbfuibqwufba";
    expect.assertions(3);
    try {
      tokenService.verifyUserPermission(token);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test(" Fail case with no token ", () => {
    const currentError = new InvalidSignature();
    token = undefined;
    expect.assertions(3);
    try {
      tokenService.verifyUserPermission(token);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test(" Fail case with expired token ", () => {
    const currentError = new TokenExpired();
    token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQzNWQ5MmUwLTY3ZmEtNDcxZC05Njk4LWJlYThjNTVhMzFhMyIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjYzMzMwMTQ2LCJleHAiOjE2NjMzMzM3NDZ9.jTH3QE6IU5pCBW_i1DWhGfMmFsHKjCTV5MqY8-RIZ90";
    expect.assertions(3);
    try {
      tokenService.verifyUserPermission(token);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });
});
