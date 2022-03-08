import { Request, Response } from "express";
import { loginDTO } from "../../plans/domain/Types";
import { AuthApplication } from "../application/Aplication";
import { Auth } from "../domain/Domain";


export class AuthPresentation {
    constructor(private authApplication : AuthApplication) {}

    public async login(req: Request, res: Response): Promise<void> {
        try {
           const input : loginDTO = { 
               email: req.body.email,
               password: req.body.password
           }

            const token = await this.authApplication.login(input)
            res.status(201).send(token)
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async signup(req: Request, res: Response): Promise<void> {
        try {
           
            const uid = await this.authApplication.signup()

            res.status(201).send(uid)
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

}