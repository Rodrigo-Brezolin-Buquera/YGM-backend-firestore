import { CustomError } from "../../../common/customError/customError";
import { Plan } from "../domain/plans.Entity";
import { PlanIdDTO, PlanDTO } from "../domain/plans.DTO";
import { PlanRepository } from "./plans.Repository";

export class PlanApplication {
  constructor(private planInfrastructure: PlanRepository) {}

  public async findPlans(): Promise<Plan[]> {
    try {
      const result: Plan[] = await this.planInfrastructure.findPlans();
      return result;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async createPlan(input: PlanDTO): Promise<void> {
    try {
      const { type, frequency, availableClasses, durationInMonths, token } = input;
      Plan.verifyAdminPermission(token)
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
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deletePlan({ id, token }: PlanIdDTO): Promise<void> {
    try {
      Plan.verifyAdminPermission(token)
      await this.planInfrastructure.deletePlan(id);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
