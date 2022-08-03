import { Request, Response } from "express";
import { PlanApplication } from "../application/plans.Application";
import { PlansMapper } from "../domain/plans.Mapper";

export class PlanPresentation {
  constructor(private planApplication: PlanApplication) {}

  public async findPlans(req: Request, res: Response): Promise<void> {
    try {
      const plans = await this.planApplication.findPlans();
      res.status(200).send(plans);
    } catch (error:any) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }

  public async createPlan(req: Request, res: Response): Promise<void> {
    try {
      const input = PlansMapper.toPlanDTO(req)

      await this.planApplication.createPlan(input);

      res.status(201).send({ message: "Plano criado com sucesso" });
    } catch (error:any) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }

  public async deletePlan(req: Request, res: Response): Promise<void> {
    try {
      const input = PlansMapper.toPlanIdDTO(req)

      await this.planApplication.deletePlan(input);
      res.status(200).send({ message: "Plano deletado com sucesso" });
    } catch (error:any) {
      res.status(error.statusCode || 400).send(error.message);
    }
  }
}
