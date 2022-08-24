import { Request, Response } from "express";
import { AuthApplication } from "../application/auth.Application";
import { AuthMapper } from "../domain/auth.Mapper";

export class AuthPresentation {
  constructor(private authApplication: AuthApplication) {}

  public async login(req: Request, res: Response): Promise<void> {
    const input = AuthMapper.toLoginDTO(req);

    const token = await this.authApplication.login(input);

    res.status(200).send({ message: "Login realizado", token });
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    const input = AuthMapper.toCreateUserDTO(req);

    await this.authApplication.createUser(input);

    res.status(201).send({ message: "Usuário criado" });
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    const input = AuthMapper.toDeleteUserDTO(req);
    await this.authApplication.deleteUser(input);

    res.status(200).send({ message: "Usuário deletado" });
  }

  public async changePassword(req: Request, res: Response): Promise<void> {
    const input = AuthMapper.toUserIdDTO(req);

    await this.authApplication.changePassword(input);

    res.status(200).send({ message: "Link enviado para o email" });
  }
}
