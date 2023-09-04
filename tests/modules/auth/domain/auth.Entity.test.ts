import { CustomError } from "../../../../src/common/customError/customError";
import { User } from "../../../../src/modules/auth/domain/auth.Entity";

describe("Auth: Sucess case on User entity", () => {
  test("Sucess case", () => {
    const userMock = {
      email: "teste@email.com",
      name: "Nome teste",
      id: "123",
    };
    const result = User.toModel(userMock);
    expect(result).toBeInstanceOf(User);
  });

  test("Sucess case wih Admin", () => {
    const userMock = {
      email: "teste@email.com",
      name: "Nome teste",
      id: "123",
      admin: true,
    };
    const result = User.toModel(userMock);
    expect(result).toBeInstanceOf(User);
  });

  test("Sucess case wih Admin and active", () => {
    const userMock = {
      email: "teste@email.com",
      name: "Nome teste",
      id: "123",
      admin: false,
      active: false,
    };
    const result = User.toModel(userMock);
    expect(result).toBeInstanceOf(User);
  });

  test("Sucess case wihtout ID and name", () => {
    const userMock = {
      email: "teste@email.com",
    };
    const result = User.toModel(userMock);
    expect(result).toBeInstanceOf(User);
  });

  test("Sucess case: getters", () => {
    const userMock = {
      email: "teste@email.com",
      name: "Nome teste",
      id: "123",
    };
    const result = User.toModel(userMock);
    expect(result.getId()).toBe(userMock.id)
    expect(result.getEmail()).toBe(userMock.email)
    expect(result.getName()).toBe(userMock.name)

  });
});



