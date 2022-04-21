import { Request, Response } from "express";
import { AuthApplication } from "../application/auth.Aplication";
import { AuthMapper } from "../domain/auth.Mapper";

export class AuthPresentation {
    constructor(private authApplication : AuthApplication) {}

    public async login(req: Request, res: Response): Promise<void> {
        try {
           const input = AuthMapper.toModelLoginDTO(req)

            await this.authApplication.login(input)
            
            res.status(201).send({message: "Login realizado criado"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const input = AuthMapper.toModelCreateUserDTO(req)
           
           await this.authApplication.createUser(input)

            res.status(201).send({message: "Usuário criado"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const input = AuthMapper.toModelUserIdDTO(req)
           
            await this.authApplication.deleteUser(input)

            res.status(201).send({message: "Usuário deletado"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }


}