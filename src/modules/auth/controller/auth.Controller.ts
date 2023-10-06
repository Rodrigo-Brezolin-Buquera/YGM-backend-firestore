import { Request, Response } from "express";
import { IdSchema } from "../../../common/domain/common.id.dto";
import { AuthBusiness } from "../business/auth.Business";
import { LoginSchema } from "../domain/DTOs/auth.login.dto";
import { SignupSchema } from "../domain/DTOs/auth.signup.dto";

export class AuthController {
  constructor(private authBusiness: AuthBusiness) {}

  public async login(req: Request, res: Response): Promise<void> {
    const input = LoginSchema.parse({token: req.headers.authorization});
    const result = await this.authBusiness.login(input);
    res.status(200).send({result});
  }

  public async signup(req: Request, res: Response): Promise<void> {
    const input = SignupSchema.parse({
      token: req.headers.authorization,
      name: req.body.name
    });
    await this.authBusiness.signup(input);
    res.status(201).send({ message: "Conta criada com sucesso" });
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
}
