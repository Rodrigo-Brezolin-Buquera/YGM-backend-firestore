import { Plan } from "../domain/plans.Entity";
import { PlanIdDTO, PlanDTO, EditPlanDTO } from "../domain/plans.DTO";
import { PlanRepository } from "./plans.Repository";

export class PlanApplication {
  constructor(private planInfrastructure: PlanRepository) {}

  public async findPlans(): Promise<Plan[]> {
    const result: Plan[] = await this.planInfrastructure.findPlans();
    return result;
  }

  public async createPlan(input: PlanDTO): Promise<void> {
    const {
      type,
      frequency,
      availableClasses,
      durationInMonths,
      monthlyPayment,
      token,
    } = input;
    Plan.verifyAdminPermission(token);
    const id = `${frequency}-${type}`;

    const newPlan = new Plan(
      id,
      type,
      frequency,
      availableClasses,
      durationInMonths,
      monthlyPayment
    );

    newPlan
      .checkType()
      .checkFrequency()
      .checkClasses()
      .checkDuration()
      .checkPayment();

    await this.planInfrastructure.postPlan(newPlan);
  }

  public async editPlan(input: EditPlanDTO): Promise<void> {
    const {
      id,
      type,
      frequency,
      availableClasses,
      durationInMonths,
      monthlyPayment,
      token,
    } = input;
    Plan.verifyAdminPermission(token);
    Plan.checkId(id)
  
    const newPlan = new Plan(
      id,
      type,
      frequency,
      availableClasses,
      durationInMonths,
      monthlyPayment
    );

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
