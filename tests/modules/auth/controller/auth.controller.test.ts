import { ZodError } from "zod";
import { zodErrorHandler } from "../../../../src/common/customError/zodErrorHandler";
import { AuthBusiness } from "../../../../src/modules/auth/business/auth.Business";
import { AuthController } from "../../../../src/modules/auth/controller/auth.Controller";
import { AuthBusinessMock } from "../mocks/auth.businessMock";
import { AuthDatabaseMock } from "../mocks/auth.database.mock";
import { AuthMailerServiceMock } from "../mocks/auth.mailer.service.mock";
import { userMock } from "../mocks/auth.userMock";
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

  test("Error: invalid email", async () => {
    req.body = {
      email: "email",
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
  test("Sucess case", async () => {
    req.body = {
      name: "teste",
      email: "teste@email.com",
      password: "1234556",
    },
      await authController.signup(req, res);
    expect(authBusiness.signup).toBeCalledWith({
      email: "teste@email.com",
      password: "1234556",
      name:"teste"
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({ token: expect.any(String) });
  });

  test("Error: empty email", async () => {
    req.body = {
      name: "teste",
      email: "",
      password: "1234556",
    },
    expect.assertions(1);
    try {
      await authController.signup(req, res);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  test("Error: invalid email", async () => {
    req.body = {
      name: "teste",
      email: "email",
      password: "1234556",
    },
    expect.assertions(1);
    try {
      await authController.signup(req, res);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("Error: empty password", async () => {
    req.body = {
      name: "teste",
      email: "email@email.com",
      password: "",
    },
    expect.assertions(1);
    try {
      await authController.signup(req, res);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("Error: empty name", async () => {
    req.body = {
      name: "",
      email: "email@email.com",
      password: "123456",
    },
    expect.assertions(1);
    try {
      await authController.signup(req, res);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("Error: short name", async () => {
    req.body = {
      name: "a",
      email: "email@email.com",
      password: "123456",
    },
    expect.assertions(1);
    try {
      await authController.signup(req, res);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("Error: long name", async () => {
    req.body = {
      name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      email: "email@email.com",
      password: "123456",
    },
    expect.assertions(1);
    try {
      await authController.signup(req, res);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });


});

describe("AuthController: FindInactiveuser method", () => {
  const req: any = {};
  test("Sucess case", async () => {
    await authController.findInactiveUsers(req, res);
    expect(authBusiness.findInactiveUsers).toBeCalled()
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ result: [userMock]  });
  });
});


describe("AuthController: DeleteUser method", () => {
  const req: any = { params: {} };
  test("Sucess case", async () => {
    req.params.id = "id"
    await authController.deleteUser(req, res);
    expect(authBusiness.deleteUser).toBeCalledWith({id:"id"})
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: "Usuário deletado" });
  });

  test("Error: empty id", async () => {
    req.params.id = ""
    expect.assertions(1);
    try {
      await authController.deleteUser(req, res);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe("AuthController: changePassword method", () => {
  const req: any = { params: {} };
  test("Sucess case", async () => {
    req.params.id = "id"
    await authController.changePassword(req, res);
    expect(authBusiness.changePassword).toBeCalledWith({id:"id"})
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({message: "Link enviado para o email" });
  });

  test("Error: empty id", async () => {
    req.params.id = ""
    expect.assertions(1);
    try {
      await authController.changePassword(req, res);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe("AuthController: changeUserPassword method", () => {
  const req: any = { };
  test("Sucess case", async () => {
    req.body = {email: "email@email.com"}
    await authController.changeUserPassword(req, res);
    expect(authBusiness.changeUserPassword).toBeCalledWith({email: "email@email.com"})
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({message: "Link enviado para o email" });
  });

  test("Error: empty email", async () => {
    req.body = {email: ""}
    expect.assertions(1);
    try {
      await authController.changeUserPassword(req, res);
    } catch (error) {
      expect(error).toBeDefined();
    }
  })
  
  test("Error: invalid email", async () => {
    req.body = {email: "email"}
    expect.assertions(1);
    try {
      await authController.changeUserPassword(req, res);
    } catch (error) {
      expect(error).toBeDefined();
    }
  }) 
});