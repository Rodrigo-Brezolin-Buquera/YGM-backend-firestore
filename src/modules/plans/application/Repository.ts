import { Plan } from "../domain/Domain";


export interface PlanRepository {
    postPlan() : Promise<any>
    editPlan(): Promise<void>
    findPlans(): Promise<Plan[]>
    deletePlan(): Promise<void> 
    toModelPan(obj: any): Plan 

}