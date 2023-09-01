import { IAuthMailerService } from "../../../../../src/modules/auth/business/auth.ports";

export class AuthMailerServiceMock implements IAuthMailerService {

  sendResetPasswordLink = jest.fn (async (
    email: string,
    resetLink: string
  ): Promise<void> => {});
}
