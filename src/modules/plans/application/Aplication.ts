import { CustomError } from "../../../common/customError/customError";
import { Plan } from "../domain/Domain";
import { idDTO, planDTO } from "../domain/Types";
import { PlanRepository } from "./Repository";

export class PlanApplication {
  constructor(private planInfrastructure: PlanRepository) {}

  public async findPlans(): Promise<Plan[]> {
    try {
      const result: Plan[] = await this.planInfrastructure.findPlans();

      return result;
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async createPlan(input: planDTO): Promise<void> {
    try {
      const { type, frequency, availableClasses, durationInMonths } = input;
      const id = `${frequency}-${type}`  

      const newPlan = new Plan(
        id,
        type,
        frequency,
        availableClasses,
        durationInMonths
      );

      newPlan
        .checkType(type)
        .checkFrequency(frequency)
        .checkClasses(availableClasses)
        .checkDuration(durationInMonths);

     
      await this.planInfrastructure.postPlan(newPlan);
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

 

  public async deletePlan({id}: idDTO): Promise<void> {
    try {
      
      await this.planInfrastructure.deletePlan(id);
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
}
