import { PlanRepository } from "../business/plan.Repository";
import { Plan, SimplePlan } from "../domain/plan.Entity";
import { BaseDatabase } from "../../../common/database/BaseDatabase";

export class PlanDatabase extends BaseDatabase implements PlanRepository {
  
  collectionName = "plans";

  public async findPlans(): Promise<Plan[]> {
    const planList = await super.findAll();
    return planList.map((plan: any) => this.selectPlan(plan));
  }

  public async findPlan(id: string): Promise<Plan | SimplePlan> {
    const plan = await super.findById(id)
    return this.selectPlan(plan)    
  }

  public async postPlan(plan: Plan): Promise<void> {
    await super.create(plan, this.toFireStorePlan);
  }

  public async editPlan(plan: Plan): Promise<void> {
    await super.edit(plan, this.toFireStorePlan);
  }

  public async deletePlan(id: string): Promise<void> {
    await super.delete(id);
  }

  private toFireStorePlan(obj: Plan): Object {
    return {
      id: obj.getId(),
      type: obj.getType(),
      frequency: obj.getFrequency(),
      availableClasses: obj.getAvailableClasses(),
      durationInMonths: obj.getDurationInMonths(),
      monthlyPayment: obj.getMonthlyPayment(),
    };
  }

  private selectPlan(plan: any): Plan | SimplePlan {
    return plan.frequency ? Plan.toModel(plan) : new SimplePlan(plan.id, plan.type);

  }
}
