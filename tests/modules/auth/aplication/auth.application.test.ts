import { AuthApplication } from "../../../../src/modules/auth/application/auth.Application";
import { CreateUserDTO, UserIdDTO } from "../../../../src/modules/auth/domain/auth.DTO";
import { TokenServiceMock } from "../../../common/application/mocks/common.token.service.mock";
import { AuthInfrastructureMock } from "./mocks/auth.infrastructure.mock";
import { AuthMailerServiceMock } from "./mocks/auth.mailer.service.mock";
import { AuthPasswordServiceMock } from "./mocks/auth.password.service.mock";

const authApplication = new AuthApplication(
  new AuthInfrastructureMock(),
  new TokenServiceMock(),
  new AuthMailerServiceMock(),
  new AuthPasswordServiceMock()
);

describe("Login tests - Auth Application",  () => {
  test("Sucess case", async () => {
    expect.assertions(1)
    try { 
        const result = await authApplication.login({token:"token"})
        expect(result).toBe("Token")
    } catch (error:any) {     
    }
  });
});

describe("CreateUsers tests - Auth Application",  () => {
    test("Sucess case", async () => {
      expect.assertions(1)
      try { 
          const input: CreateUserDTO = {
            id: "id",
            email: "teste@teste.com.br",
            name: "teste teste",
            token: "token"
        }
          const result = await authApplication.createUser(input)
          expect(result).toBeUndefined()
      } catch (error:any) {     
      }
    });
  });

  describe("DeleteUsers tests - Auth Application",  () => {
    test("Sucess case", async () => {
      expect.assertions(1)
      try { 
          const input: UserIdDTO = {
            id: "id",
            token: "token"
        }
          const result = await authApplication.deleteUser(input)
          expect(result).toBeUndefined()
      } catch (error:any) {     
      }
    });
  });

  describe("changePassword tests - Auth Application",  () => {
    test("Sucess case", async () => {
      expect.assertions(1)
      try { 
        const input: UserIdDTO = {
            id: "id",
            token: "token"
        }
          const result = await authApplication.changePassword(input)
          expect(result).toBeUndefined()
      } catch (error:any) {     
      }
    });
  });