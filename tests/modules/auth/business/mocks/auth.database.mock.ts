import { AuthRepository } from "../../../../../src/modules/auth/business/auth.Repository";
import { User } from "../../../../../src/modules/auth/domain/auth.Entity";
import { PayloadOutput } from "../../../../../src/modules/auth/domain/DTOs/auth.output.dto";

export const userMock = User.toModel({
  email: "teste@email.com",
  password: "123456",
  name: "Nome teste",
  id: "123",
  admin: false,
  active: false,
});

export class AuthDatabaseMock implements AuthRepository {
  signup = jest.fn(
    async (email: string, password: string): Promise<PayloadOutput> => {
      return { id: "id", admin: false };
    }
  );

  findUser = jest.fn(async (id: string): Promise<User> => {
    return userMock;
  });
  findInactiveUsers = jest.fn(async (): Promise<User[]> => {
    return [userMock];
  });
  activeUser = jest.fn(async (id: string): Promise<void> => {});
  login = jest.fn(async (email: string): Promise<PayloadOutput> => {
    return { id: "ID", admin: true };
  });
  createUser = jest.fn(async (auth: User): Promise<void> => {});
  deleteUser = jest.fn(async (id: string): Promise<void> => {});
  changePassword = jest.fn(async (id: string): Promise<string> => "link");
}
