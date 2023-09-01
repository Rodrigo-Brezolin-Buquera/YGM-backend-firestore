import { Request, Response } from "express";
import { IdSchema } from "../../../common/domain/common.id.dto";
import { BookingBusiness } from "../business/booking.Business";
import { DeleteSchema } from "../domain/DTOs/booking.delete.dto";
import { FindCheckinchema } from "../domain/DTOs/booking.getByEntity.dto";

export class BookingController {
  constructor(private bookingBusiness: BookingBusiness) {}


  public async findUserCheckin(req: Request, res: Response): Promise<void> {
    const input = IdSchema.parse({id: req.body.tokenId})
    const result = await this.bookingBusiness.findUserCheckin(input);
    res.status(201).send({result});
  }

  public async findCheckin(req: Request, res: Response): Promise<void> {
    const input = IdSchema.parse({id: req.params.id})
    const result = await this.bookingBusiness.findCheckin(input);
    res.status(201).send({result});
  }

  public async findCheckinByEntity(req: Request, res: Response): Promise<void> {
    const input = FindCheckinchema.parse({
      id: req.params.id,
      entity: req.params.entity
    })
    const result = await this.bookingBusiness.findByEntity(input);
    res.status(201).send({result});
  }

  // public async createCheckin(req: Request, res: Response): Promise<void> {
  //   await this.bookingBusiness.createCheckin(input);
  //   res.status(201).send({ message: "Checkin realizado criado" });
  // }


  public async deleteCheckin(req: Request, res: Response): Promise<void> { 
    const input = DeleteSchema.parse({
      id: req.params.id,
      type: req.params.type
    })
    await this.bookingBusiness.deleteCheckin(input);
    res.status(200).send({ message: "Check-in deletado" });
  }



}
