import { Plan } from "../domain/plans.Entity";


export interface PlanRepository {
    postPlan(plan:Plan) : Promise<any>
    findPlans(): Promise<Plan[]>
    deletePlan(id:string): Promise<void> 
    toModelPlan(obj: any): Plan 

}