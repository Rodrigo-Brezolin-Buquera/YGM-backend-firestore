export interface IAuthMailerService {
  sendPasswordToEmail(email: string, password: string): Promise<void>;
  sendResetPasswordLink(email: string, resetLink: string): Promise<void>;
}


export interface IAuthPasswordService {
    passwordGenerator(): string 
}