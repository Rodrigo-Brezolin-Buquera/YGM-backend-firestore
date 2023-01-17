import { Plan } from "../domain/plans.Entity";


export interface PlanRepository {
    postPlan(plan:Plan) : Promise<void>
    editPlan(plan:Plan) : Promise<void>
    findPlans(): Promise<Plan[]>
    deletePlan(id:string): Promise<void> 
 

}