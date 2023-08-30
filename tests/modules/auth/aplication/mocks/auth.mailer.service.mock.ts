import { IAuthMailerService } from "../../../../../src/modules/auth/business/auth.ports";

export class AuthMailerServiceMock implements IAuthMailerService {
  sendPasswordToEmail = jest.fn(async (
    email: string,
    password: string
  ): Promise<void> => {});

  sendResetPasswordLink = jest.fn (async (
    email: string,
    resetLink: string
  ): Promise<void> => {});
}
