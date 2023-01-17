import { PlanRepository } from "../application/plans.Repository";
import { Plan } from "../domain/plans.Entity";
import { PlansFirostoreMapper } from "./plans.Firestore.mapper";
import { BaseInfrastructure } from "../../../config/firebase";
import { PlanNotFound } from "../../../common/customError/notFound";

export class PlanInfrastructure
  extends BaseInfrastructure
  implements PlanRepository
{
 
  private planCollection = BaseInfrastructure.admin
    .firestore()
    .collection("plans");

  public async findPlans(): Promise<Plan[]> {
    const plansSnaphot = await this.planCollection.get();

    const planList = plansSnaphot.docs.map((doc) => doc.data());
    const result = planList.map((plan) => Plan.toPlan(plan));

    return result;
  }

  public async postPlan(plan: Plan): Promise<void> {
    await this.planCollection
      .doc(plan.id)
      .set(PlansFirostoreMapper.toFireStorePlan(plan));
  }

  public async editPlan(plan: Plan): Promise<void> {
    await this.planCollection
    .doc(plan.id)
    .update(PlansFirostoreMapper.toFireStorePlan(plan));
  }

  public async deletePlan(id: string): Promise<void> {
    const planSnap = await this.planCollection.doc(id).get();

    if (planSnap.exists) {
      await this.planCollection.doc(id).delete();
    } else {
      throw new PlanNotFound();
    }
  }
}
