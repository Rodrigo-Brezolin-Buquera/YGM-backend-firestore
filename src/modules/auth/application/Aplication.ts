import { CustomError } from "../../../common/customError/customError";
import { loginDTO, signupDTO } from "../domain/Types";
import { Auth } from "../domain/Domain";
import { AuthRepository } from "./Repository";
import { passwordGenerator } from "../../../common/services/passwordGenerator";
import { transporter } from "../../../common/services/MailTransporter";


export class AuthApplication {
  constructor(private authInfrastructure: AuthRepository) {}


  public async login({ email, password }: loginDTO): Promise<string> {
    try {
      const auth = new Auth(email, password);
      auth.checkEmail(email).checkPassword(password);

      const token = await this.authInfrastructure.login(auth);

      return token;
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async signup({ id, name, email }: signupDTO): Promise<any> {
    try {
      const password = passwordGenerator();
      const auth = new Auth(email, password, id, name);

      auth.checkEmail(email).checkId(id).checkName(name);

      await this.authInfrastructure.signup(auth);

      // enviar senha para usuário - falta configurar dotenv
      await transporter.sendMail({
        from: `<${process.env.NODEMAILER_USER}>`,
        to: email,
        subject: "Sua senha de acesso",
        html: `<p>Sua senha de acesso é: ${password} </p>`,
        text: `Sua senha de acesso é: ${password} `
    })
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
}
