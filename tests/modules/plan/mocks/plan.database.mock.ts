import { PlanRepository } from "../../../../src/modules/plans/business/plan.Repository";
import { Plan, SimplePlan } from "../../../../src/modules/plans/domain/plan.Entity";


const mockPLans = [
  Plan.toModel({
    id: "1x-Mensal",
    type: "Mensal",
    frequency: "1x",
    availableClasses: 12,
    durationInMonths: 1,
    monthlyPayment: "R$ 100,00"
  }),
  new SimplePlan("simple-plan", "Gympass") as unknown as Plan
]


export class PLanDatabaseMock implements PlanRepository {
   findPlan = jest.fn( async (id: string): Promise<Plan | SimplePlan> => {
    return mockPLans.find(i => i.getId() === id)!

   })
   createPlan = jest.fn(async(plan: Plan): Promise<void>=> {})
   editPlan = jest.fn(async(plan: Plan): Promise<void>=> {})
   findPlans = jest.fn(async(): Promise<Plan[]> =>{
    return mockPLans
  })
   deletePlan = jest.fn(async(id: string): Promise<void>=>{})
}
