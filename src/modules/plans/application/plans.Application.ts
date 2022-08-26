import { Plan } from "../domain/plans.Entity";
import { PlanIdDTO, PlanDTO } from "../domain/plans.DTO";
import { PlanRepository } from "./plans.Repository";

export class PlanApplication {
  constructor(private planInfrastructure: PlanRepository) {}

  public async findPlans(): Promise<Plan[]> {
    const result: Plan[] = await this.planInfrastructure.findPlans();
    return result;
  }

  public async createPlan(input: PlanDTO): Promise<void> {
    const { type, frequency, availableClasses, durationInMonths, token } =
      input;
    Plan.verifyAdminPermission(token);
    Plan.checkEmptyInput(input);
    const id = `${frequency}-${type}`;

    const newPlan = new Plan(
      id,
      type,
      frequency,
      availableClasses,
      durationInMonths
    );

    newPlan.checkType().checkFrequency().checkClasses().checkDuration();

    await this.planInfrastructure.postPlan(newPlan);
  }

  public async deletePlan({ id, token }: PlanIdDTO): Promise<void> {
    Plan.verifyAdminPermission(token);
    Plan.checkId(id);
    await this.planInfrastructure.deletePlan(id);
  }
}
