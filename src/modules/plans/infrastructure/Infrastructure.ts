import { CustomError, PlanNotFound } from "../../../common/customError/customError";
import { PlanRepository } from "../application/Repository";
import { Plan } from "../domain/Domain";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore/lite';
import { BaseInfrastructure } from "../../../config/firebase";

export class PlanInfrastructure extends BaseInfrastructure implements PlanRepository {

    protected static planCollection = BaseInfrastructure.firestore.collection("plans")

    public async findPlans(): Promise<Plan[]> {
        try {
            const plansSnaphot =  await PlanInfrastructure.planCollection.get()           
            const planList = plansSnaphot.docs.map(doc => doc.data());
            const result = planList.map((plan)=> this.toModelPlan(plan))

            return result
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    public async postPlan(plan:Plan): Promise<void> {
        try {           
            const newPlan = {
                id: plan.id,
                type: plan.type,
                frequency: plan.frequency,
                availableClasses: plan.availableClasses,
                durationInMonths: plan.durationInMonths 
            }
            await PlanInfrastructure.planCollection.doc(plan.id).set(newPlan) 
         
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }
 
    public async  deletePlan(id:string): Promise<void> {
        try {
            const planDoc = await PlanInfrastructure.planCollection.doc(id).get()
            
            if(planDoc.exists){
                await await PlanInfrastructure.planCollection.doc(id).delete()
            } else {
                throw new PlanNotFound
            }   
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }
    
    public toModelPlan(obj: any) :Plan {
        const result = new Plan(obj.id, obj.type, obj.frequency, obj.availableClasses, obj.durationInMonths )
        return result
    }
}

