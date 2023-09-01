import { Request, Response } from "express";
import { IdSchema } from "../../../common/domain/common.id.dto";
import { AuthBusiness } from "../business/auth.Business";
import { EmailSchema } from "../domain/DTOs/auth.email.dto";
import { LoginSchema } from "../domain/DTOs/auth.login.dto";
import { SignupSchema } from "../domain/DTOs/auth.signup.dto";

export class AuthController {
  constructor(private authBusiness: AuthBusiness) {}

  public async login(req: Request, res: Response): Promise<void> {
    const input = LoginSchema.parse(req.body);
    const token = await this.authBusiness.login(input);
    res.status(200).send({ message: "Login realizado", token });
  }

  public async signup(req: Request, res: Response): Promise<void> {
    const input = SignupSchema.parse(req.body);
    await this.authBusiness.signup(input);
    res.status(201).send({ message: "Usuário criado" });
  }

  public async findInactiveUsers(req: Request, res: Response): Promise<void> {
    const result = await this.authBusiness.findInactiveUsers();
    res.status(200).send({result});
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    const input = IdSchema.parse({ id: req.params.id });
    await this.authBusiness.deleteUser(input);
    res.status(200).send({ message: "Usuário deletado" });
  }

  public async changePassword(req: Request, res: Response): Promise<void> {
    const input = IdSchema.parse({ id: req.params.id });
    await this.authBusiness.changePassword(input);
    res.status(200).send({ message: "Link enviado para o email" });
  }

  public async changeUserPassword(req: Request, res: Response): Promise<void> {
    const input = EmailSchema.parse({ email: req.body.email });
    await this.authBusiness.changeUserPassword(input);
    res.status(200).send({ message: "Link enviado para o email" });
  }
}
