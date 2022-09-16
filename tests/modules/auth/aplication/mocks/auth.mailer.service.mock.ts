import { IAuthMailerService } from "../../../../../src/modules/auth/application/auth.ports";

export class AuthMailerServiceMock implements IAuthMailerService {
  sendPasswordToEmail = async (
    email: string,
    password: string
  ): Promise<void> => {};

  sendResetPasswordLink = async (
    email: string,
    resetLink: string
  ): Promise<void> => {};
}
