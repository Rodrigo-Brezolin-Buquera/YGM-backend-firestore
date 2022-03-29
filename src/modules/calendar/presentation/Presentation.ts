import { Request, Response } from "express";
import { CalendarApplication } from "../application/Aplication";
import { CreateClassDTO, DeleteClassDTO, EditClassDTO } from "../domain/Types";

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
            const input: CreateClassDTO = {
                name: req.body.name,
                date: req.body.date,
                day: req.body.day,
                time: req.body.time,
                teacher: req.body.teacher
            }
         
            await this.calendarApplication.createClass(input)

            res.status(201).send({message: "Aula criada"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async editClass(req: Request, res: Response): Promise<void> {
        try {
            const input: EditClassDTO  = {
                name: req.body.name,
                time: req.body.time,
                teacher: req.body.teacher,
                changingDate: req.body.changingDate,
                groupId: req.params.groupId
            }
           
            await this.calendarApplication.editClass(input)

            res.status(201).send({message: "Aula aleterada"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public async deleteClass(req: Request, res: Response): Promise<void> {
        try {
            const input: DeleteClassDTO  = {
                date: req.params.date,
                groupId: req.params.id
            }
           
            res.status(201).send({message: "Aula deletada"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


}