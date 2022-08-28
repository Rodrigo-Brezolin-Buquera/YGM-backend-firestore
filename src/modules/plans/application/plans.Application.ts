import { Plan } from "../domain/plans.Entity";
import { PlanIdDTO, PlanDTO, EditPlanDTO } from "../domain/plans.DTO";
import { PlanRepository } from "./plans.Repository";
import { PlansMapper } from "../domain/plans.Mapper";

export class PlanApplication {
  constructor(private planInfrastructure: PlanRepository) {}

  public async findPlans(): Promise<Plan[]> {
    const result: Plan[] = await this.planInfrastructure.findPlans();
    return result;
  }

  public async createPlan(input: PlanDTO): Promise<void> {
    const { type, frequency, token } = input;
    Plan.verifyAdminPermission(token);
    const id = `${frequency}-${type}`;

    const newPlan = PlansMapper.toPlan({ ...input, id });

    newPlan
      .checkType()
      .checkFrequency()
      .checkClasses()
      .checkDuration()
      .checkPayment();

    await this.planInfrastructure.postPlan(newPlan);
  }

  public async editPlan(input: EditPlanDTO): Promise<void> {
    const { id, token } = input;
    Plan.verifyAdminPermission(token);
    Plan.checkId(id);

    const newPlan = PlansMapper.toPlan(input);

    newPlan
      .checkType()
      .checkFrequency()
      .checkClasses()
      .checkDuration()
      .checkPayment();

    await this.planInfrastructure.editPlan(newPlan);
  }

  public async deletePlan({ id, token }: PlanIdDTO): Promise<void> {
    Plan.verifyAdminPermission(token);
    Plan.checkId(id);
    await this.planInfrastructure.deletePlan(id);
  }
}
