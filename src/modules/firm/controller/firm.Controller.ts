import { Request, Response } from "express";
import { FirmBusiness } from "../business/firm.Business";
import { EditFirmSchema } from "../domain/DTOs/firm.edit.dto";

export class FirmController {
  constructor(private firmBusiness: FirmBusiness) {}

  public async find(req: Request, res: Response): Promise<void> {
    const result = await this.firmBusiness.find();
    res.status(200).send({ result });
  }

  public async edit(req: Request, res: Response): Promise<void> {
    const input = EditFirmSchema.parse({
      address: req.body.address,
      email: req.body.email,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      phone: req.body.phone,
      website: req.body.website,
      whatsapp: req.body.whatsapp,
    });
    await this.firmBusiness.edit(input);
    res.status(200).send({ message: "Dados alterados" });
  }
}
