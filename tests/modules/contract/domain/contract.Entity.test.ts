import { Plan } from "../../../../src/common/domain/common.enum";
import { Contract } from "../../../../src/modules/contracts/domain/contract.Entity";

const getInitialInput = () => {
  return {
    id: "id",
    name: "name",
    plan: Plan.MONTHLYX1,
    started: "26/01/2022",
    ends: "26/07/2022",
    availableClasses: 20,
  };
};


describe("Contract Entity", ()=>{
    test("Sucess case", ()=>{
        const input = getInitialInput()
        const result = Contract.toModel(input)
        expect(result).toBeInstanceOf(Contract)
    })

    test("Sucess case: especial contracts", ()=>{
        const input = getInitialInput()
        input.availableClasses = null as any
        input.ends = null as any

        const result = Contract.toModel(input)
        expect(result).toBeInstanceOf(Contract)
    })

    test("Sucess case: getters", ()=>{
        const input = getInitialInput()
        const result = Contract.toModel(input)
        expect(result.getId()).toBe(input.id)
        expect(result.getName()).toBe(input.name)
        expect(result.getPlan()).toBe(input.plan)
        expect(result.getStarted()).toBe(input.started)
        expect(result.getEnds()).toBe(input.ends)
        expect(result.getAvailableClasses()).toBe(input.availableClasses)
    })

    test("Sucess case: setters", ()=>{
        const input = getInitialInput()
        
        const result = Contract.toModel(input)
        result.setPlan(Plan.GYMPASS)
        result.setStarted("20/03/2020")
        result.setEnds("22/07/2021")
        result.setClasses(5)

        expect(result.getPlan()).toBe(Plan.GYMPASS)
        expect(result.getStarted()).toBe("20/03/2020")
        expect(result.getEnds()).toBe("22/07/2021")
        expect(result.getAvailableClasses()).toBe(5)
    })

    const validPlans = ["1x-Mensal", "2x-Trimestral", "3x-Semestral", "Gympass", "Totalpass"];
    validPlans.forEach((plan) => {
    test(`Sucess case: plan format ${plan}`, () => {
        const input = getInitialInput()
        input.plan = plan as Plan
        const result =Contract.toModel(input)
        expect(result).toBeInstanceOf(Contract)
        expect(result.getPlan()).toBe(plan)
    });
  });

    const invalidPlans = ["AAAAA", "gympass", "231"];
    invalidPlans.forEach((plan) => {
    test(`Error: Invalid planformat ${plan}`, () => {
      expect.assertions(2);
      try {
        const input = getInitialInput()
        input.plan = plan as Plan
        Contract.toModel(input)
      } catch (error: any) {
        expect(error.message).toBe("Plano inválido");
        expect(error.statusCode).toBe(400);
      }
    });
  });




})