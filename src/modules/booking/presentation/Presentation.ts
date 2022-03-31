import { Request, Response } from "express";
import { BookingApplication } from "../application/Aplication";
import { createCheckinDTO, deleteCheckinDTO, validateCheckinDTO } from "../domain/Types";

export class BookingPresentation {
    constructor(private bookingApplication : BookingApplication) {}

    public async createCheckin(req: Request, res: Response): Promise<void> {
        try {
            const input: createCheckinDTO = {
                contractId: req.body.contractId,
                yogaClassId: req.body.yogaClassId,
                name: req.body.name,
                date: req.body.date
            }
           
            res.status(201).send({message: "Checkin realizado criado"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async validateCheckin(req: Request, res: Response): Promise<void> {
        try {
            const input: validateCheckinDTO = {
                checkinId: req.body.id,
                verified: req.body.verified
            }
          
            res.status(201).send({message: "Usuário criado"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async deleteCheckin(req: Request, res: Response): Promise<void> {
        try {
            const input: deleteCheckinDTO = {
                checkinId: req.body.id,
            }
          

            res.status(201).send({message: "Usuário deletado"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


}