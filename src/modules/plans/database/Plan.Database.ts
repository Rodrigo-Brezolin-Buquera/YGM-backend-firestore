import { PlanRepository } from "../application/plans.Repository";
import { Plan } from "../domain/plans.Entity";
import { BaseDatabase } from "../../../common/database/BaseDatabase";
import { PlanNotFound } from "../../../common/customError/notFound";

export class PlanDatabase extends BaseDatabase implements PlanRepository {
  private col = "plans"
  
  private collection = BaseDatabase.admin.firestore().collection(this.col);

  public async findPlans(): Promise<Plan[]> {
    const plansSnaphot = await this.collection.get();
    const planList = plansSnaphot.docs.map((doc) => doc.data());
    return planList.map((plan) => Plan.toModel(plan));
  }

  public async postPlan(plan: Plan): Promise<void> {
    await this.collection.doc(plan.getId()).set(this.toFireStorePlan(plan));
  }

  public async editPlan(plan: Plan): Promise<void> {
    await this.collection.doc(plan.getId()).update(this.toFireStorePlan(plan));
  }

  public async deletePlan(id: string): Promise<void> {
    const planSnap = await this.collection.doc(id).get();

    if (planSnap.exists) {
      await this.collection.doc(id).delete();
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
