import { Request, Response } from "express";

import { BookingApplication } from "../application/Aplication";



export class BookingPresentation {
    constructor(private bookingApplication : BookingApplication) {}

    public async createCheckin(req: Request, res: Response): Promise<void> {
        try {
           
            res.status(201).send({message: "Login realizado criado"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async validateCheckin(req: Request, res: Response): Promise<void> {
        try {
          

            res.status(201).send({message: "Usuário criado"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async deleteCheckin(req: Request, res: Response): Promise<void> {
        try {
          

            res.status(201).send({message: "Usuário deletado"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


}