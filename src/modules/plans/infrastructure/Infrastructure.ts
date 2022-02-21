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


    public async  postPlan(): Promise<any> {
        try {
            const planDoc = doc(PlanInfrastructure.planCollection, "teste")
            const newPlan = {
               teste: "teste"
              }
             await setDoc(planDoc, newPlan)
           
          return 
        } catch (error) {
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
    }
    public async  editPlan(): Promise<void> {
        try {
            const planDoc = doc(PlanInfrastructure.planCollection, "planID/name");
            const newPlan = {}
            await updateDoc(planDoc, newPlan)

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
        const result = new Plan(obj.id, obj.availableClasses, obj.durationInMonths, obj.frequency )
        return result
    }
}

