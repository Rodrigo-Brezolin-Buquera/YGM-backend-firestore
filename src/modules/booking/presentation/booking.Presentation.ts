import { Request, Response } from "express";
import { BookingApplication } from "../application/Aplication";
import { BookingMapper } from "../domain/bokking.Mapper";

export class BookingPresentation {
  constructor(private bookingApplication: BookingApplication) {}

  public async createCheckin(req: Request, res: Response): Promise<void> {
    try {
      const input = BookingMapper.toModelCreateCheckinDTO(req)

      await this.bookingApplication.createCheckin(input);

      res.status(201).send({ message: "Checkin realizado criado" });
    } catch (error) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }

  public async validateCheckin(req: Request, res: Response): Promise<void> {
    try {
      const input = BookingMapper.toModelValidateCheckinDTO(req)

      await this.bookingApplication.validateCheckin(input);

      res.status(201).send({ message: "Status do check-in alterado" });
    } catch (error) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }

  public async deleteCheckin(req: Request, res: Response): Promise<void> {
    try {
      const input = BookingMapper.toModelCheckinIdDTO(req)

      await this.bookingApplication.deleteCheckin(input);

      res.status(201).send({ message: "Check-in deletado" });
    } catch (error) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }
}
