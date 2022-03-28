import { Request, Response } from "express";
import { CalendarApplication } from "../application/Aplication";
import { createClassDTO } from "../domain/Types";

export class CalendarPresentation {
    constructor(private calendarApplication : CalendarApplication) {}

    public async findAllClasses(req: Request, res: Response): Promise<void> {
        try {

            const result = await this.calendarApplication.findAllClasses()
           
            res.status(201).send(result)
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async createClass(req: Request, res: Response): Promise<void> {
        try {
            const input: createClassDTO = {
                name: req.body.name,
                date: req.body.date,
                day: req.body.day,
                time: req.body.time,
                teacher: req.body.teacher,
            }
         
            await this.calendarApplication.createClass(input)

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