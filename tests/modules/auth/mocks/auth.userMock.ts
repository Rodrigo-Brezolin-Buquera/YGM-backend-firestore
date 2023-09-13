import { User } from "../../../../src/modules/auth/domain/auth.Entity";

export const userMock = User.toModel({
    email: "teste@email.com",
    name: "Nome teste",
    id: "123",
    admin: false,
    active: false,
  });
  