import { PlanRepository } from "../business/plan.Repository";
import { Plan, PlanObject, SimplePlan } from "../domain/plan.Entity";
import { BaseDatabase } from "../../../common/database/BaseDatabase";
import { NotFound } from "../../../common/customError/notFound";

export class PlanDatabase extends BaseDatabase implements PlanRepository {
  
  collectionName = "plans";

  public async findPlans(): Promise<Array<Plan | SimplePlan>>{
    const planList = await super.findAll();
    return planList.map((plan: FirebaseFirestore.DocumentData) => this.selectPlan(plan));
  }

  public async findPlan(id: string): Promise<Plan | SimplePlan | undefined> {
    const plan = await super.findById(id)
    return plan && this.selectPlan(plan)    
  }

  public async createPlan(plan: Plan): Promise<void> {
    await super.create(plan, this.toFireStorePlan);
  }

  public async editPlan(plan: Plan): Promise<void> {
    await super.edit(plan, this.toFireStorePlan);
  }

  public async deletePlan(id: string): Promise<void> {
    await super.delete(id);
  }

  private toFireStorePlan(obj: Plan): object {
    return {
      id: obj.getId(),
      type: obj.getType(),
      frequency: obj.getFrequency(),
      monthlyPayment: obj.getMonthlyPayment(),
    };
  }

  private selectPlan(plan: FirebaseFirestore.DocumentData ): Plan | SimplePlan {
    return plan.frequency ? Plan.toModel(plan as PlanObject) : new SimplePlan(plan.id, plan.type);
  }
}


