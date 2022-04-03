import { CustomError } from "../../../common/customError/customError";
import { PlanRepository } from "../application/Repository";
import { Plan } from "../domain/Domain";
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
  protected static planCollection = collection(
    BaseInfrastructure.firestore,
    "plans"
  );

  public async findPlans(): Promise<Plan[]> {
    try {
      const plansSnaphot = await getDocs(PlanInfrastructure.planCollection);
      const planList = plansSnaphot.docs.map((doc) => doc.data());
      const result = planList.map((plan) => this.toModelPlan(plan));

      return result;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async postPlan(plan: Plan): Promise<void> {
    try {
      const newPlan = {
        id: plan.id,
        type: plan.type,
        frequency: plan.frequency,
        availableClasses: plan.availableClasses,
        durationInMonths: plan.durationInMonths,
      };
      const planDoc = doc(PlanInfrastructure.planCollection, plan.id);
      await setDoc(planDoc, newPlan);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deletePlan(id: string): Promise<void> {
    try {
      const planDoc = doc(PlanInfrastructure.planCollection, id);
      const docSnap = await getDoc(planDoc);

      if (docSnap.exists()) {
        await deleteDoc(planDoc);
      } else {
        throw CustomError.planNotFound();
      }
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public toModelPlan(obj: any): Plan {
    const result = new Plan(
      obj.id,
      obj.type,
      obj.frequency,
      obj.availableClasses,
      obj.durationInMonths
    );
    return result;
  }
}
