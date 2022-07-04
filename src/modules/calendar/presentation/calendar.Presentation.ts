import { Request, Response } from "express";
import { CalendarApplication } from "../application/calendar.YogaClass.service";
import { CalendarMapper } from "../domain/calendar.Mapper";

export class CalendarPresentation {
    constructor(private calendarApplication : CalendarApplication) {}

    public async findAllClasses(req: Request, res: Response): Promise<void> {
        try {
            const input = CalendarMapper.toClassQueryDTO(req)
            const result = await this.calendarApplication.findAllClasses(input)
           
            res.status(200).send(result)
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public async findClassById(req: Request, res: Response): Promise<void> {
        try {
            const input = CalendarMapper.toClassIdDTO(req)
            const result = await this.calendarApplication.findClassById(input)
           
            res.status(200).send(result)
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public async createClass(req: Request, res: Response): Promise<void> {
        try {
           
            const input = CalendarMapper.toCreateClassDTO(req)
         
            await this.calendarApplication.createClass(input)

            res.status(201).send({message: "Aula criada"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public async editClass(req: Request, res: Response): Promise<void> {
        try {
            const input = CalendarMapper.toEditClassDTO(req)
           
            await this.calendarApplication.editClass(input)

            res.status(200).send({message: "Aula aleterada"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public async deleteClasses(req: Request, res: Response): Promise<void> {
        try {
         
            const input = CalendarMapper.toDeleteClassesDTO(req)
           
            await this.calendarApplication.deleteClasses(input)
           
            res.status(200).send({message: "Aulas deletadas"})
        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }


}