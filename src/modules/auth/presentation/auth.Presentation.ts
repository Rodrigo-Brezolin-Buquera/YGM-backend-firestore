import { Request, Response } from "express";
import { AuthApplication } from "../application/auth.Application";
import { AuthDTOMapper } from "./auth.DTOMapper"

export class AuthPresentation {
  constructor(private authApplication: AuthApplication) {}

  public async login(req: Request, res: Response): Promise<void> {
    const input = AuthDTOMapper.toLoginDTO(req);

    const token = await this.authApplication.login(input);

    res.status(200).send({ message: "Login realizado", token });
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    const input = AuthDTOMapper.toCreateUserDTO(req);

    await this.authApplication.createUser(input);

    res.status(201).send({ message: "Usuário criado" });
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    const input = AuthDTOMapper.toDeleteUserDTO(req);
    await this.authApplication.deleteUser(input);

    res.status(200).send({ message: "Usuário deletado" });
  }

  public async changePassword(req: Request, res: Response): Promise<void> {
    const input = AuthDTOMapper.toUserIdDTO(req);

    await this.authApplication.changePassword(input);

    res.status(200).send({ message: "Link enviado para o email" });
  }
}
