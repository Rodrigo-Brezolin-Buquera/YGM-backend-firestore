import { Request, Response } from "express";
import { IdSchema } from "../../../common/domain/common.id.dto";
import { PlanBusiness } from "../business/Plan.Business";
import { CreatePlanSchema } from "../domain/DTOs/createPlan.dto";
import { EditPlanSchema } from "../domain/DTOs/editPlan.dto";

export class PlanController {
  constructor(private planBusiness: PlanBusiness) {}

  public async findPlans(req: Request, res: Response): Promise<void> {
    const plans = await this.planBusiness.findPlans();
    res.status(200).send(plans);
  }

  public async createPlan(req: Request, res: Response): Promise<void> {
    const input = CreatePlanSchema.parse(req.body);
    await this.planBusiness.createPlan(input);
    res.status(201).send({ message: "Plano criado com sucesso" });
  }

  public async editPlan(req: Request, res: Response): Promise<void> {
    const body ={
      id: req.params.id,
      monthlyPayment:req.body.monthlyPayment
    }
    const input = EditPlanSchema.parse(body);
    await this.planBusiness.editPlan(input);
    res.status(201).send({ message: "Plano alterado com sucesso" });
  }

  public async deletePlan(req: Request, res: Response): Promise<void> {
    const input = IdSchema.parse(req.body);
    await this.planBusiness.deletePlan(input);
    res.status(200).send({ message: "Plano deletado com sucesso" });
  }
}
