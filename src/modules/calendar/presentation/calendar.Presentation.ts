import { Request, Response } from "express";
import { CalendarApplication } from "../application/Aplication";
import { CreateClassDTO, ClassIdDTO, DeleteClassesDTO, EditClassDTO } from "../domain/calendar.DTO";
import { CalendarMapper } from "../domain/calendar.Mapper";

export class CalendarPresentation {
    constructor(private calendarApplication : CalendarApplication) {}

    public async findAllClasses(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.calendarApplication.findAllClasses()
           
            res.status(201).send(result)
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public async createClass(req: Request, res: Response): Promise<void> {
        try {
            const input = CalendarMapper.toModelCreateClassDTO(req.body)
         
            await this.calendarApplication.createClass(input)

            res.status(201).send({message: "Aula criada"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public async editClass(req: Request, res: Response): Promise<void> {
        try {
            const input = CalendarMapper.toModelEditClassDTO(req)
           
            await this.calendarApplication.editClass(input)

            res.status(201).send({message: "Aula aleterada"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public async deleteClass(req: Request, res: Response): Promise<void> {
        try {
            const input = CalendarMapper.toModelClassIdDTO(req)

            await this.calendarApplication.deleteClass(input)
           
            res.status(201).send({message: "Aula deletadas"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public async deleteClasses(req: Request, res: Response): Promise<void> {
        try {
            const input = CalendarMapper.toModelDeleteClassesDTO(req)

            await this.calendarApplication.deleteClasses(input)
           
            res.status(201).send({message: "Aulas deletadas"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }


}