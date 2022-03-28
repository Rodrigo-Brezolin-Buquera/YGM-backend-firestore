import { Request, Response } from "express";
import { CalendarApplication } from "../application/Aplication";
// import {  } from "../domain/Domain";
// import { } from "../domain/Types";


export class CalendarPresentation {
    constructor(private calendarApplication : CalendarApplication) {}

    public async findAllClasses(req: Request, res: Response): Promise<void> {
        try {

           
            res.status(201).send()
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async createClass(req: Request, res: Response): Promise<void> {
        try {
            

            res.status(201).send({message: "Aula criada"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async editClass(req: Request, res: Response): Promise<void> {
        try {
           

            res.status(201).send({message: "Aula aleterada"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async deleteClass(req: Request, res: Response): Promise<void> {
        try {
           

            res.status(201).send({message: "Aula deletada"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


}