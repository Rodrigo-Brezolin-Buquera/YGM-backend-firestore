import { PlanBusiness } from "../../../../src/modules/plans/business/plan.Business";
import { CreatePlanDTO } from "../../../../src/modules/plans/domain/DTOs/plan.createPlan.dto";
import { Plan } from "../../../../src/modules/plans/domain/plan.Entity";
import { PLanDatabaseMock } from "../mocks/plan.database.mock";

const planDB = new PLanDatabaseMock();
const planBusiness = new PlanBusiness(planDB);

describe("PlanBusiness: FindPlans method", () => {
  test("Sucess Case", async () => {
    const result = await planBusiness.findPlans();
    expect(result[0]).toBeInstanceOf(Plan);
    expect(planDB.findPlans).toBeCalledTimes(1);
  });
});

describe("PlanBusiness: CreatePlan method", () => {
  const getInitialObject = (): any => {
    return {
      type: "Mensal",
      frequency: "3x",
      availableClasses: 10,
      durationInMonths: 3,
      monthlyPayment: 100,
    };
  };

  test("Sucess Case", async () => {
    const input = getInitialObject();
    await planBusiness.createPlan(input);
    expect(planDB.createPlan).toBeCalledTimes(1);
  });

  test("Error: Plan already exists", async () => {
      expect.assertions(2)
    try {
        const input = getInitialObject();
        input.frequency = "1x"
        await planBusiness.createPlan(input);
    } catch (error:any) {
        expect(error.statusCode).toBe(409);
        expect(error.message).toBe("Plano já existe" );
    }

  });
});


describe("PlanBusiness: EditPlan method", () => {
    const getInitialObject = (): any => {
      return {
        id: "1x-Mensal",
        monthlyPayment: 100,
      };
    };
  
    test("Sucess Case", async () => {
      const input = getInitialObject();
      await planBusiness.editPlan(input);
      expect(planDB.editPlan).toBeCalledTimes(1);
    });
  
    test("Error: Plan not found", async () => {
        expect.assertions(2)
      try {
          const input = getInitialObject();
          input.id = "5x-mensal"
          await planBusiness.editPlan(input);
      } catch (error:any) {
          expect(error.statusCode).toBe(404);
          expect(error.message).toBe(`Não foi possível encontrar o(a) plano`);
      }
    });

    test("Error: edit not applicable", async () => {
        expect.assertions(2)
      try {
          const input = getInitialObject();
          input.id = "simple-plan"
          await planBusiness.editPlan(input);
      } catch (error:any) {
          expect(error.statusCode).toBe(400);
          expect(error.message).toBe("Valores não se aplicam a este plano");
      }
    });
  });



  describe("PlanBusiness: DeletePlan method", () => {
    test("Sucess Case", async () => {
      await planBusiness.deletePlan({id: "id"});
      expect(planDB.deletePlan).toBeCalledTimes(1);
    });
     
  });