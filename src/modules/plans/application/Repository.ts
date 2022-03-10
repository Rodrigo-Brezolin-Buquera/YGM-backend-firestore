import { Plan } from "../domain/Domain";


export interface PlanRepository {
    postPlan(plan:Plan) : Promise<any>
    findPlans(): Promise<Plan[]>
    deletePlan(id:string): Promise<void> 
    toModelPan(obj: any): Plan 

}