import { Request, Response } from "express";
import { BookingApplication } from "../application/booking.Checkin.Application";
import { BookingMapper } from "../domain/booking.Mapper";

export class BookingPresentation {
  constructor(private bookingApplication: BookingApplication) {}

  public async createCheckin(req: Request, res: Response): Promise<void> {
    try {
      const input = BookingMapper.toCreateCheckinDTO(req)

      await this.bookingApplication.createCheckin(input);

      res.status(201).send({ message: "Checkin realizado criado" });
    } catch (error:any) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }

  public async validateCheckin(req: Request, res: Response): Promise<void> {
    try {
      const input = BookingMapper.toValidateCheckinDTO(req)

      await this.bookingApplication.validateCheckin(input);

      res.status(200).send({ message: "Status do check-in alterado" });
    } catch (error:any) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }

  public async deleteCheckin(req: Request, res: Response): Promise<void> {
    try {
      const input = BookingMapper.toCheckinIdDTO(req)
      
      await this.bookingApplication.deleteCheckin(input);

      res.status(200).send({ message: "Check-in deletado" });
    } catch (error:any) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }
}
