import { CreatePlanDTO } from "../controller/DTOs/createPlan.dto";
import { EditPlanDTO } from "../controller/DTOs/editPlan.dto";
import { PlanIdDTO } from "../controller/DTOs/planId.dto";
import { Plan } from "../domain/Plan.Entity";
import { PlanRepository } from "./Plan.Repository";

export class PlanBusiness {
  constructor(
    private planDB: PlanRepository,
  ) {}

  public async findPlans(): Promise<Plan[]> {
    return await this.planDB.findPlans();
  }

  public async createPlan(input: CreatePlanDTO): Promise<void> {
    const { type, frequency } = input;
    const id = `${frequency}-${type}`;
    const plan = Plan.toModel({ ...input, id });
    await this.planDB.postPlan(plan);
  }

  public async editPlan(input: EditPlanDTO): Promise<void> {
    const plan = Plan.toModel(input);
    await this.planDB.editPlan(plan);
  }

  public async deletePlan({ id }: PlanIdDTO): Promise<void> {
    await this.planDB.deletePlan(id);
  }
}
