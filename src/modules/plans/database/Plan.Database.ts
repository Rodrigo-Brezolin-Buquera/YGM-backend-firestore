import { PlanRepository } from "../business/Plan.Repository";
import { Plan } from "../domain/Plan.Entity";
import { BaseDatabase } from "../../../common/database/BaseDatabase";
import { PlanNotFound } from "../../../common/customError/notFound";

export class PlanDatabase extends BaseDatabase implements PlanRepository {
  collectionName = "plans";

  public async findPlans(): Promise<Plan[]> {
    const planList = await super.findAll();
    const result = planList.map((plan: any) => {
      return plan.frequency ? Plan.toModel(plan) : plan;
    });
    return result;
  }

  public async postPlan(plan: Plan): Promise<void> {
    await super.create(plan, this.toFireStorePlan);
  }

  public async editPlan(plan: Plan): Promise<void> {
    await super.edit(plan, this.toFireStorePlan);
  }

  public async deletePlan(id: string): Promise<void> {
    const planSnap = await super.findById(id);
    if (planSnap.exists) {
      await super.delete(id);
    } else {
      throw new PlanNotFound();
    }
  }

  private toFireStorePlan(obj: Plan): any {
    return {
      id: obj.getId(),
      type: obj.getType(),
      frequency: obj.getFrequency(),
      availableClasses: obj.getAvailableClasses(),
      durationInMonths: obj.getDurationInMonths(),
      monthlyPayment: obj.getMonthlyPayment(),
    };
  }
}
