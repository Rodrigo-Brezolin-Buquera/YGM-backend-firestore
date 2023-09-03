import { CustomError } from "../../../../src/common/customError/customError";
import { User } from "../../../../src/modules/auth/domain/auth.Entity";

describe("Auth: Sucess case on User entity", () => {
  test("Sucess case", () => {
    const userMock = {
      email: "teste@email.com",
      password: "123456",
      name: "Nome teste",
      id: "123",
    };
    const input = User.toModel(userMock);
    expect(input).toBeInstanceOf(User);
  });

  test("Sucess case wih Admin", () => {
    const userMock = {
      email: "teste@email.com",
      password: "123456",
      name: "Nome teste",
      id: "123",
      admin: true,
    };
    const input = User.toModel(userMock);
    expect(input).toBeInstanceOf(User);
  });

  test("Sucess case wihtout ID and name", () => {
    const userMock = {
      email: "teste@email.com",
      password: "123456",
      name: "Nome teste",
      id: "123",
      admin: false,
      active: false,
    };
    const input = User.toModel(userMock);
    expect(input).toBeInstanceOf(User);
  });

  test("Sucess case wihtout ID and name", () => {
    const userMock = {
      email: "teste@email.com",
      password: "123456",
    };
    const input = User.toModel(userMock);
    expect(input).toBeInstanceOf(User);
  });

  // teste getters.
});

describe("Auth: Error case with invalid Name", () => {
 
 // separar em teste só disso
  // const invalidFormats = ["0432", "@AAA", "R0", "/", "*"];

  // invalidFormats.forEach((name) => {
  //   test(`Invalid name format ${name}`, () => {
  //     expect.assertions(2);
  //     try {
  //       userMock.name = name
  //       User.toModel(userMock)
  //     } catch (error: any) {
  //       expect(error.message).toBe("Nomes não podem caracteres especiais e números");
  //       expect(error.statusCode).toBe(400);
  //     }
  //   });
  // });


});
