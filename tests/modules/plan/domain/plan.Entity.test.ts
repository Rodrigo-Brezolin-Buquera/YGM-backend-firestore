import { Plan } from "../../../../src/modules/plans/domain/plan.Entity";

const getInitialObject = (): any => {
  return {
    id: "string",
    type: "Mensal",
    frequency: "1x",
    availableClasses: 10,
    durationInMonths: 3,
    monthlyPayment: "R$ 100,00"
  }
}



describe("Plan entity", () => {
  const plan = getInitialObject()
  test("Sucess case", () => {
   
  });

  
});
