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
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async createPlan(input: PlanDTO): Promise<void> {
    try {
      const { type, frequency, availableClasses, durationInMonths, token } = input;
      Plan.verifyAdminPermission(token)
      Plan.checkEmptyInput(input)
      const id = `${frequency.trim()}-${type.trim()}`;

      const newPlan = new Plan(
        id,
        type.trim(),
        frequency.trim(),
        availableClasses,
        durationInMonths
      );

      newPlan.checkType().checkFrequency().checkClasses().checkDuration();

      await this.planInfrastructure.postPlan(newPlan);
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deletePlan({ id, token }: PlanIdDTO): Promise<void> {
    try {
      Plan.verifyAdminPermission(token)
      Plan.checkId(id)
      await this.planInfrastructure.deletePlan(id.trim());
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
