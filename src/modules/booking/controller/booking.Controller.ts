import { Request, Response } from "express";
import { IdSchema } from "../../../common/domain/common.id.dto";
import { BookingBusiness } from "../business/booking.Business";
import { CreateCheckinSchema } from "../domain/DTOs/booking.create.dto";
import { CreateSingleSchema } from "../domain/DTOs/booking.createSingle.dto";
import { DeleteSchema } from "../domain/DTOs/booking.delete.dto";
import { FindCheckinchema } from "../domain/DTOs/booking.getByEntity.dto";

export class BookingController {
  constructor(private bookingBusiness: BookingBusiness) {}

  public async findUserCheckin(req: Request, res: Response): Promise<void> {
    const input = FindCheckinchema.parse({
      id: req.body.tokenPayload.id,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      entity: "contract"
    })
    const result = await this.bookingBusiness.findByEntity(input);
    res.status(200).send({result});
  }

  public async findCheckin(req: Request, res: Response): Promise<void> {
    const input = IdSchema.parse({id: req.params.id})
    const result = await this.bookingBusiness.findCheckin(input);
    res.status(200).send({result});
  }

  public async findByEntity(req: Request, res: Response): Promise<void> {
    const input = FindCheckinchema.parse({
      id: req.params.id,
      entity: req.params.entity,
      limit: req.query.limit ? Number(req.query.limit) : undefined
    })
    const result = await this.bookingBusiness.findByEntity(input);
    res.status(200).send({result});
  }

  public async createCheckin(req: Request, res: Response): Promise<void> {
    const input = CreateCheckinSchema.parse({
      contractId: req.body.tokenPayload.id,
      yogaClassId: req.params.classId,
      date: req.body.date,
      name: req.body.name,
      time: req.body.time
    })
    await this.bookingBusiness.createCheckin(input);
    res.status(201).send({ message: "Checkin realizado criado" });
  }

  public async createSingleCheckin(req: Request, res: Response): Promise<void> {
    const input = CreateSingleSchema.parse({
      yogaClassId: req.params.classId,
      date: req.body.date,
      name: req.body.name,
      time: req.body.time
    })
    await this.bookingBusiness.createSingleCheckin(input);
    res.status(201).send({ message: "Checkin realizado criado" });
  }

  public async deleteCheckin(req: Request, res: Response): Promise<void> { 
    const input = DeleteSchema.parse({
      id: req.params.id,
      type: req.query.type
    })
    await this.bookingBusiness.deleteCheckin(input);
    res.status(200).send({ message: "Check-in deletado" });
  }

}
