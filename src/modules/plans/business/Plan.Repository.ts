import { Plan, SimplePlan } from "../domain/plan.Entity";


export interface PlanRepository {
    createPlan(plan:Plan) : Promise<void>
    editPlan(plan:Plan) : Promise<void>
    findPlans(): Promise<Array<Plan | SimplePlan>>
    deletePlan(id:string): Promise<void> 
    findPlan(id:string): Promise<Plan | SimplePlan |undefined>
 

}