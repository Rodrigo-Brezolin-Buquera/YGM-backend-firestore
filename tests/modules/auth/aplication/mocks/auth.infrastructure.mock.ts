import { AuthRepository } from "../../../../../src/modules/auth/application/auth.Repository";
import {
  LoginOutput,
  ResetPasswordOutput,
} from "../../../../../src/modules/auth/domain/auth.DTO";
import { User } from "../../../../../src/modules/auth/domain/auth.Entity";

export class AuthInfrastructureMock implements AuthRepository {
  async login(auth: string): Promise<LoginOutput> {
    return {
      id: "ID",
      admin: true,
    };
  }
  async createUser(auth: User): Promise<void> {}
  async deleteUser(id: string): Promise<void> {}
  async changePassword(id: string): Promise<ResetPasswordOutput> {
    return {
      email: "email",
      resetLink: "link",
    };
  }
}
