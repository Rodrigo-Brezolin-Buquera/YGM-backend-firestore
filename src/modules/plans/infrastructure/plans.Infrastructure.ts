import { CustomError } from "../../../common/customError/customError";
import { PlanRepository } from "../application/plans.Repository";
import { Plan } from "../domain/plans.Entity";
import { PlansMapper } from "../domain/plans.Mapper";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore/lite";
import { BaseInfrastructure } from "../../../config/firebase";

export class PlanInfrastructure
  extends BaseInfrastructure
  implements PlanRepository
{
  private planCollection = BaseInfrastructure.admin
    .firestore()
    .collection("plans");
  // protected static planCollection = collection(BaseInfrastructure.firestore,"plans");

  public async findPlans(): Promise<Plan[]> {
    try {
      const plansSnaphot = await this.planCollection.get();
      // const plansSnaphot = await getDocs(PlanInfrastructure.planCollection);
      const planList = plansSnaphot.docs.map((doc) => doc.data());
      const result = planList.map((plan) => PlansMapper.toPlan(plan));

      return result;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async postPlan(plan: Plan): Promise<void> {
    try {
      await this.planCollection
        .doc(plan.id)
        .set(PlansMapper.toFireStorePlan(plan));

      // const planDoc = doc(PlanInfrastructure.planCollection, plan.id);

      // await setDoc(planDoc, PlansMapper.toFireStorePlan(plan));
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deletePlan(id: string): Promise<void> {
    try {
      const planSnap = await this.planCollection.doc(id).get();

      // const planDoc = doc(PlanInfrastructure.planCollection, id);
      // const docSnap = await getDoc(planDoc);

      if (planSnap.exists) {
        await this.planCollection.doc(id).delete();
      } else {
        throw CustomError.planNotFound();
      }
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
