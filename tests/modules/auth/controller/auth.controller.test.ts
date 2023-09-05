
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
    req.headers = {
      authorization: "token",
    },
      await authController.login(req, res);
    expect(authBusiness.login).toBeCalledWith({ token: "token"});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ token: expect.any(String) });
  });

  test("Error: empty token", async () => {
    req.headers = {
      authorization: "",
    },
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
    }
    req.headers = {
      authorization: "token",
    },
      await authController.signup(req, res);
    expect(authBusiness.signup).toBeCalledWith({
      token: "token",
      name:"teste"
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({ token: expect.any(String) });
  });

  

  test("Error: empty token", async () => {
    req.body = {
      name: "teste",
    }
    req.headers = {
      authorization: "",
    }
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
    }
    req.headers = {
      authorization: "token",
    }
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
    }
    req.headers = {
      authorization: "token",
    }
    expect.assertions(1);
    try {
      await authController.signup(req, res);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("Error: long name", async () => {
    req.body = {
      name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
    req.headers = {
      authorization: "token",
    }
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