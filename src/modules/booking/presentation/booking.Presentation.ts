import { Request, Response } from "express";
import { BookingApplication } from "../application/booking.Application";
import { BookingMapper } from "../domain/booking.Mapper";

export class BookingPresentation {
  constructor(private bookingApplication: BookingApplication) {}

  
  public async findCheckinByEntity(req: Request, res: Response): Promise<void> {
    const input = BookingMapper.toFindCheckinDTO(req);

    const result = await this.bookingApplication.findCheckin(input);

    res.status(201).send(result);
  }

  public async createCheckin(req: Request, res: Response): Promise<void> {
    const input = BookingMapper.toCreateCheckinDTO(req);

    await this.bookingApplication.createCheckin(input);

    res.status(201).send({ message: "Checkin realizado criado" });
  }

  public async validateCheckin(req: Request, res: Response): Promise<void> {
    const input = BookingMapper.toValidateCheckinDTO(req);

    await this.bookingApplication.validateCheckin(input);

    res.status(200).send({ message: "Status do check-in alterado" });
  }

  public async deleteCheckin(req: Request, res: Response): Promise<void> { 
    const input = BookingMapper.toCheckinIdDTO(req);

    await this.bookingApplication.deleteCheckin(input);

    res.status(200).send({ message: "Check-in deletado" });
  }

  public async deleteAllCheckinByContract(req: Request, res: Response): Promise<void> { 
    const input = BookingMapper.toCheckinIdDTO(req);

    await this.bookingApplication.deleteAllCheckinByContract(input);

    res.status(200).send({ message: "Check-ins do contrato deletados" });
  }

}
