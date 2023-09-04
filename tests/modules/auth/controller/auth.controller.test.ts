import { ZodError } from "zod";
import { zodErrorHandler } from "../../../../src/common/customError/zodErrorHandler";
import { AuthBusiness } from "../../../../src/modules/auth/business/auth.Business";
import { AuthController } from "../../../../src/modules/auth/controller/auth.Controller";
import { AuthBusinessMock } from "../mocks/auth.businessMock";
import { AuthDatabaseMock } from "../mocks/auth.database.mock";
import { AuthMailerServiceMock } from "../mocks/auth.mailer.service.mock";
import { TokenServiceMock } from "../mocks/common.token.mock";

const authBusiness = new AuthBusinessMock(
  new AuthDatabaseMock(),
  new TokenServiceMock(),
  new AuthMailerServiceMock()
) as unknown as AuthBusiness;

const authController = new AuthController(authBusiness);
const res: any = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
};

describe("AuthController: Login method", () => {
  const req: any = {};
  test("Sucess case", async () => {
    req.body = {
      email: "teste@email.com",
      password: "1234556",
    },
      await authController.login(req, res);
    expect(authBusiness.login).toBeCalledWith({
      email: "teste@email.com",
      password: "1234556",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ token: expect.any(String) });
  });

  test("Error: empty email", async () => {
    req.body = {
      email: "",
      password: "123456",
    };
    expect.assertions(1);
    try {
      await authController.login(req, res);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("Error: empty password", async () => {
    req.body = {
      email: "email@email.com",
      password: "",
    };
    expect.assertions(1);
    try {
      await authController.login(req, res);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe("AuthController: Signup method", () => {
  const req: any = {};
  // test("Sucess case", async () => {
  //   req.body = {
  //     name: "teste",
  //     email: "teste@email.com",
  //     password: "1234556",
  //   },
  //     await authController.login(req, res);
  //   expect(authBusiness.login).toBeCalledWith({
  //     email: "teste@email.com",
  //     password: "1234556",
  //     name:"teste"
  //   });
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.send).toHaveBeenCalledWith({ token: expect.any(String) });
  // });

  // test("Error: empty email", async () => {
  //   req.body = {
  //     email: "",
  //     password: "123456",
  //   };
  //   expect.assertions(1);
  //   try {
  //     await authController.login(req, res);
  //   } catch (error) {
  //     expect(error).toBeDefined();
  //   }
  // });

  // test("Error: empty password", async () => {
  //   req.body = {
  //     email: "email@email.com",
  //     password: "",
  //   };
  //   expect.assertions(1);
  //   try {
  //     await authController.login(req, res);
  //   } catch (error) {
  //     expect(error).toBeDefined();
  //   }
  // });
});