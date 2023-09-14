import { NotFound } from "../../../../src/common/customError/notFound";
import { PlanDatabase } from "../../../../src/modules/plans/database/plan.Database";
import { Plan } from "../../../../src/modules/plans/domain/plan.Entity";

const planDB = new PlanDatabase();

describe("PlanDatabase: CreatePlan method", () => {
  test("Sucess case", async () => {
    const input = Plan.toModel({
      id: "00-plano-teste",
      type: "Mensal",
      frequency: "1x",
      availableClasses: 12,
      durationInMonths: 1,
      monthlyPayment: "R$ 100,00",
    });
    const result = await planDB.createPlan(input);
    expect(result).toBeUndefined()

  });
});

describe("PlanDatabase: FindPlans method", () => {
  test("Sucess case", async () => {
    const result = await planDB.findPlans();
    expect(result.length).toBeGreaterThanOrEqual(0);
  });
});

describe("PlanDatabase: FindPlan method", () => {
  test("Sucess case", async () => {
    const result = await planDB.findPlan("00-plano-teste");
    expect(result).toBeInstanceOf(Plan);
  });
});

describe("PlanDatabase: EditPLan method", () => {
  test("Sucess case", async () => {
    const input = Plan.toModel({
      id: "00-plano-teste",
      type: "Mensal",
      frequency: "3x",
      availableClasses: 12,
      durationInMonths: 1,
      monthlyPayment: "R$ 100,00",
    });

    await planDB.editPlan(input);
    const result = (await planDB.findPlan("00-plano-teste")) as Plan;
    expect(result.getFrequency()).toBe("3x");
  });

  test("Error: Plan not found", async () => {
    expect.assertions(1);
    try {
      const input = Plan.toModel({
        id: "00",
        type: "Mensal",
        frequency: "3x",
        availableClasses: 12,
        durationInMonths: 1,
        monthlyPayment: "R$ 100,00",
      });

      await planDB.editPlan(input);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFound);
    }
  });
});

describe("PlanDatabase: DeletePLan method", () => {
  test("Error: Plan not found", async () => {
    expect.assertions(1);
    try {
      await planDB.deletePlan("oo");
    } catch (error) {
      expect(error).toBeInstanceOf(NotFound);
    }
  });

  test("Sucess case", async () => {
    const result = await planDB.deletePlan("00-plano-teste");
    expect(result).toBeUndefined()
  });
});
