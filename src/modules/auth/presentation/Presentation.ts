import { Request, Response } from "express";
import { CreateUserDTO, LoginDTO, UserIdDTO } from "../domain/Types";
import { AuthApplication } from "../application/Aplication";

export class AuthPresentation {
    constructor(private authApplication : AuthApplication) {}

    public async login(req: Request, res: Response): Promise<void> {
        try {
           const input : LoginDTO = { 
               email: req.body.email,
               password: req.body.password
           }

            await this.authApplication.login(input)
            res.status(201).send({message: "Login realizado criado"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const input:CreateUserDTO = {
                id: req.body.id,
                email: req.body.email,
                name: req.body.name
            }
           
           await this.authApplication.createUser(input)

            res.status(201).send({message: "Usuário criado"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const input:UserIdDTO = {
                id: req.params.id,
            }
           
            await this.authApplication.deleteUser(input)

            res.status(201).send({message: "Usuário deletado"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }


}