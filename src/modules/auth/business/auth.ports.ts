export interface IAuthMailerService {
  sendResetPasswordLink(email: string, resetLink: string): Promise<void>;
}


