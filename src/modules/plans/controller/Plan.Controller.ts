import { Request, Response } from "express";
import { IdSchema } from "../../../common/domain/common.id.dto";
import { PlanBusiness } from "../business/plan.Business";
import { CreatePlanSchema } from "../domain/DTOs/plan.createPlan.dto";
import { EditPlanSchema } from "../domain/DTOs/plan.editPlan.dto";

export class PlanController {
  constructor(private planBusiness: PlanBusiness) {}

  public async findPlans(req: Request, res: Response): Promise<void> {
    const plans = await this.planBusiness.findPlans();
    res.status(200).send(plans);
  }

  public async createPlan(req: Request, res: Response): Promise<void> {
    const input = CreatePlanSchema.parse({
      type: req.body.type,
      frequency: req.body.frequency,
      availableClasses: req.body.availableClasses,
      durationInMonths: req.body.durationInMonths,
      monthlyPayment: req.body.monthlyPayment,
    });
    await this.planBusiness.createPlan(input);
    res.status(201).send({ message: "Plano criado com sucesso" });
  }

  public async editPlan(req: Request, res: Response): Promise<void> {
    const input = EditPlanSchema.parse({
      id: req.params.id,
      monthlyPayment: req.body.monthlyPayment,
    });
    await this.planBusiness.editPlan(input);
    res.status(201).send({ message: "Plano alterado com sucesso" });
  }

  public async deletePlan(req: Request, res: Response): Promise<void> {
    const input = IdSchema.parse({ id: req.params.id });
    await this.planBusiness.deletePlan(input);
    res.status(200).send({ message: "Plano deletado com sucesso" });
  }
}
