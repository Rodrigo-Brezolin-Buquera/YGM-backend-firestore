import { Request, Response } from "express";
import { CalendarApplication } from "../application/calendar.Application";
import { CalendarMapper } from "../domain/calendar.Mapper";

export class CalendarPresentation {
  constructor(private calendarApplication: CalendarApplication) {}

  public async findAllClasses(req: Request, res: Response): Promise<void> {
    const input = CalendarMapper.toClassQueryDTO(req);
    const result = await this.calendarApplication.findAllClasses(input);

    res.status(200).send(result);
  }

  public async findClassById(req: Request, res: Response): Promise<void> {
    const input = CalendarMapper.toClassIdDTO(req);
    const result = await this.calendarApplication.findClassById(input);

    res.status(200).send(result);
  }

  public async createClass(req: Request, res: Response): Promise<void> {
    const input = CalendarMapper.toCreateClassDTO(req);

    await this.calendarApplication.createClass(input);

    res.status(201).send({ message: "Aula criada" });
  }

  public async editClass(req: Request, res: Response): Promise<void> {
    const input = CalendarMapper.toEditClassDTO(req);

    await this.calendarApplication.editClass(input);

    res.status(200).send({ message: "Aula aleterada" });
  }

  public async deleteClasses(req: Request, res: Response): Promise<void> {
    const input = CalendarMapper.toDeleteClassesDTO(req);

    await this.calendarApplication.deleteClasses(input);

    res.status(200).send({ message: "Aulas deletadas" });
  }

  public async changeCapacity(req: Request, res: Response): Promise<void> {
    const input = CalendarMapper.toChangeCapacityDTO(req);

    await this.calendarApplication.changeCapacity(input);

    res.status(200).send({ message: "Capacidade alterada" });
  }
}
