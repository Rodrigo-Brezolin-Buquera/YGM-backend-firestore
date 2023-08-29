import { Request, Response } from "express";
import { PlanBusiness } from "../business/Plan.Business";
import { CreatePlanSchema } from "./DTOs/createPlan.dto";
import { EditPlanSchema } from "./DTOs/editPlan.dto";
import { PlanIdSchema } from "./DTOs/planId.dto";

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
    const input = EditPlanSchema.parse(req.body);
    await this.planBusiness.editPlan(input);
    res.status(201).send({ message: "Plano alterado com sucesso" });
  }

  public async deletePlan(req: Request, res: Response): Promise<void> {
    const input = PlanIdSchema.parse(req.body);
    await this.planBusiness.deletePlan(input);
    res.status(200).send({ message: "Plano deletado com sucesso" });
  }
}
