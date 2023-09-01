import { PlanRepository } from "../../../../../src/modules/plans/business/plan.Repository";
import { Plan } from "../../../../../src/modules/plans/domain/plan.Entity";

export class PlanInfrastructureMock implements PlanRepository {
   postPlan = jest.fn(async(plan: Plan): Promise<void>=> {})
   editPlan = jest.fn(async(plan: Plan): Promise<void>=> {})
   findPlans = jest.fn(async(): Promise<Plan[]> =>{
    return [
      Plan.toModel({
        id: "id",
        type: "Mensal",
        frequency: "1x",
        availableClasses: 12,
        durationInMonths: 1,
      }),
    ];
  })
   deletePlan = jest.fn(async(id: string): Promise<void>=>{})
}
