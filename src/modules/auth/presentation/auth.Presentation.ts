import { Request, Response } from "express";
import { AuthApplication } from "../application/auth.Application";
import { AuthMapper } from "../domain/auth.Mapper";

export class AuthPresentation {
  constructor(private authApplication: AuthApplication) {}

  public async login(req: Request, res: Response): Promise<void> {
    try {
      
      const input = AuthMapper.toLoginDTO(req);
      
      const token =  await this.authApplication.login(input);
      
      res.status(200).send({ message: "Login realizado", token });
    } catch (error:any) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      console.log("é chamado no pres")
      const input = AuthMapper.toCreateUserDTO(req);
      
      await this.authApplication.createUser(input);

      res.status(201).send({ message: "Usuário criado" });
    } catch (error:any) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const input = AuthMapper.toDeleteUserDTO(req);
      await this.authApplication.deleteUser(input);

      res.status(200).send({ message: "Usuário deletado" });
    } catch (error:any) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }

  public async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const input = AuthMapper.toUserIdDTO(req);

      await this.authApplication.changePassword(input);

      res.status(200).send({ message: "Link enviado para o email" });
    } catch (error:any) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }
}
