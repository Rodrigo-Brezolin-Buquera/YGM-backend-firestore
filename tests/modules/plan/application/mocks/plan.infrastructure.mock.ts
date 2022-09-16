import { PlanRepository } from "../../../../../src/modules/plans/application/plans.Repository";
import { Plan } from "../../../../../src/modules/plans/domain/plans.Entity";

export class PlanInfrastructureMock implements PlanRepository {
  async postPlan(plan: Plan): Promise<void> {}
  async editPlan(plan: Plan): Promise<void> {}
  async findPlans(): Promise<Plan[]> {
    return [
      Plan.toPlan({
        id: "id",
        type: "Mensal",
        frequency: "1x",
        availableClasses: 12,
        durationInMonths: 1,
      }),
    ];
  }
  async deletePlan(id: string): Promise<void> {}
}
