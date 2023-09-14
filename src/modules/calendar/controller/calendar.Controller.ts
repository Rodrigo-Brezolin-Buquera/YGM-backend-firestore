import { Request, Response } from "express";
import { IdSchema } from "../../../common/domain/common.id.dto";
import { CalendarBusiness } from "../business/calendar.Business";
import { CreateClassSchema } from "../domain/DTOs/calendar.createClass.dto";
import { DeleteClassSchema } from "../domain/DTOs/calendar.deleteClasses.dto";
import { FindByPeriodSchema } from "../domain/DTOs/calendar.findByPeriod.dto";

export class CalendarController {
  constructor(private calendarBusiness: CalendarBusiness) {}

  public async findClassesByPeriod(req: Request, res: Response): Promise<void> {
    const input = FindByPeriodSchema.parse({
      dates: req.query.dates
        ? JSON.parse(req.query.dates as string)
        : undefined,
    });
    const result = await this.calendarBusiness.findClassesByPeriod(input);
    res.status(200).send({ result });
  }

  public async findClass(req: Request, res: Response): Promise<void> {
    const input = IdSchema.parse({ id: req.params.id });
    const result = await this.calendarBusiness.findClass(input);
    res.status(200).send({ result });
  }

  public async createClass(req: Request, res: Response): Promise<void> {
    const input = CreateClassSchema.parse({
      name: req.body.name,
      date: req.body.date,
      day: req.body.day,
      time: req.body.time,
      teacher: req.body.teacher,
      quantity: req.body.quantity,
      capacity: req.body.capacity,
    });

    await this.calendarBusiness.createClass(input);
    res.status(201).send({ message: "Aula criada" });
  }

  public async deleteClasses(req: Request, res: Response): Promise<void> {
    const input = DeleteClassSchema.parse({
      id: req.params.id,
      allClasses: Boolean(req.query.allClasses),
    });
    await this.calendarBusiness.deleteClasses(input);
    res.status(200).send({ message: "Aula(s) deletada(s)" });
  }
}
