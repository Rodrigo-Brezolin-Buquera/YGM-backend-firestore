import { CustomError } from "../../../common/customError/customError";
import { loginDTO } from "../../plans/domain/Types";
import { Auth } from "../domain/Domain";
import { AuthRepository } from "./Repository";

export class AuthApplication {
  constructor(private authInfrastructure: AuthRepository) {}

  public async login({ email, password }: loginDTO): Promise<any> {
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

  public async signup(): Promise<any> {
    try {
      const token = await this.authInfrastructure.signup();
      return token;
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
}
