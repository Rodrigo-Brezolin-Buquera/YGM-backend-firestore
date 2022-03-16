import { CustomError } from "../../../common/customError/customError";
import { loginDTO, signupDTO, userIdDTO } from "../domain/Types";
import { Auth } from "../domain/Domain";
import { AuthRepository } from "./Repository";
import { passwordGenerator } from "../../../common/services/passwordGenerator";
import { transporter } from "../../../common/services/mailTransporter";


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

  public async signup({ name, email }: signupDTO): Promise<string> {
    try {
      const password = passwordGenerator();
      const auth = new Auth(email, password, name);

      auth.checkEmail(email).checkName(name);

      const uid = await this.authInfrastructure.signup(auth);

      await transporter.sendMail({
        from: `<${process.env.NODEMAILER_USER}>`,
        to: email,
        subject: "Sua senha de acesso",
        html: `<p>Sua senha de acesso é: ${password} </p>`,
        text: `Sua senha de acesso é: ${password} `
    })
    return uid
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async deleteUser({ id }: userIdDTO): Promise<void> {
    try {
      
       await this.authInfrastructure.deleteUser(id);

    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
}
