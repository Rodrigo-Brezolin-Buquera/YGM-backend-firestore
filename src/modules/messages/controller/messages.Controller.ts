import { Request, Response } from "express";
import { IdSchema } from "../../../common/domain/common.id.dto";
import { MessagesBusiness } from "../business/messages.Business";
import { EditFirmSchema } from "../domain/DTOs/messages.edit.dto";

export class MesssagesController {
  constructor(private messagesBusiness: MessagesBusiness) {}

  public async find(req: Request, res: Response): Promise<void> {
    const input = IdSchema.parse({
      id: req.params.id
    })
    const result = await this.messagesBusiness.find(input);
    res.status(200).send({ result });
  }

  public async edit(req: Request, res: Response): Promise<void> {
    const input = EditFirmSchema.parse({
      id: req.params.id,
      message: req.body.message
    });
    await this.messagesBusiness.edit(input);
    res.status(200).send({ message: "Messagem alterada" });
  }
}
