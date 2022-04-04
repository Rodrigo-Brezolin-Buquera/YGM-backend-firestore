import { CustomError } from "../../../common/customError/customError";
import { CreateUserDTO, LoginDTO, UserIdDTO } from "../domain/Types";
import { Auth } from "../domain/Domain";
import { AuthRepository } from "./Repository";
import { passwordGenerator } from "../../../common/services/passwordGenerator";
// import { transporter } from "../../../common/services/mailTransporter";

export class AuthApplication {
  constructor(private authInfrastructure: AuthRepository) {}

  public async login({ email, password }: LoginDTO): Promise<void> {
    try {
      const auth = new Auth(email, password);
      auth.checkEmail().checkPassword();

      await this.authInfrastructure.login(auth);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async createUser({ id, name, email }: CreateUserDTO): Promise<void> {
    try {
      const password = passwordGenerator();
      const auth = new Auth(email, password, name, id);

      auth.checkEmail().checkName();

      await this.authInfrastructure.createUser(auth);

      // erro no mailer
      //   await transporter.sendMail({
      //     from: `<${process.env.NODEMAILER_USER}>`,
      //     to: email,
      //     subject: "Sua senha de acesso",
      //     html: `<p>Sua senha de acesso é: ${password} </p>`,
      //     text: `Sua senha de acesso é: ${password} `
      // })
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteUser({ id }: UserIdDTO): Promise<void> {
    try {
      await this.authInfrastructure.deleteUser(id);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
