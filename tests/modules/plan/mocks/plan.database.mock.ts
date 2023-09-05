import { Type } from "../../../../src/common/domain/common.enum";
import { PlanRepository } from "../../../../src/modules/plans/business/plan.Repository";
import { Plan, SimplePlan } from "../../../../src/modules/plans/domain/plan.Entity";

export class PLanDatabaseMock implements PlanRepository {
   findPlan = jest.fn( async (id: string): Promise<Plan | SimplePlan> => {
    return id !== "simple-plan" ? Plan.toModel({
      id: "id",
      type: "Mensal",
      frequency: "1x",
      availableClasses: 12,
      durationInMonths: 1,
    }) :
    new SimplePlan("simple-plan", Type.GYMPASS)

   })
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
