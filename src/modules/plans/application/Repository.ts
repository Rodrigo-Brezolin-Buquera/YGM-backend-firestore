import { Plan } from "../domain/Domain";


export interface PlanRepository {
    postPlan(plan:Plan) : Promise<any>
    findPlans(): Promise<Plan[]>
    deletePlan(): Promise<void> 
    toModelPan(obj: any): Plan 

}