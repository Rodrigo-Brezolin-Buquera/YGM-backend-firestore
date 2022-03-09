import { CustomError } from "../../../common/customError/customError";
import { PlanRepository } from "../application/Repository";
import { Plan } from "../domain/Domain";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore/lite';
import { BaseInfrastructure } from "../../../config/firebase";

export class PlanInfrastructure extends BaseInfrastructure implements PlanRepository {

    protected static planCollection = collection(BaseInfrastructure.firestore, "planos")

    public async findPlans(): Promise<any[]> {
        try {
            const plansSnaphot =  await getDocs(PlanInfrastructure.planCollection);
            const planList = plansSnaphot.docs.map(doc => doc.data());

            return planList
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    public async postPlan(plan:Plan): Promise<any> {
        try {
            const planDoc = doc(PlanInfrastructure.planCollection, plan.id)
            
            const newPlan = {
                type: plan.type,
                frequency: plan.frequency,
                availableClasses: plan.availableClasses,
                durationInMonths: plan.durationInMonths 
            }

             await setDoc(planDoc, newPlan)
           
          return 
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }
 
    public async  deletePlan(): Promise<void> {
        try {
            const planDoc = doc(PlanInfrastructure.planCollection, "planID/name");
            await deleteDoc(planDoc)
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }
    
    public toModelPan(obj: any) :Plan {
        const result = new Plan(obj.id, obj.type, obj.frequency, obj.availableClasses, obj.durationInMonths )
        return result
    }
}

