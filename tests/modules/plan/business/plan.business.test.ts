import { PlanBusiness } from "../../../../src/modules/plans/business/plan.Business";
import { Plan } from "../../../../src/modules/plans/domain/plan.Entity";
import { PLanDatabaseMock } from "../mocks/plan.database.mock";

const planDB = new PLanDatabaseMock()
const planBusiness = new PlanBusiness(planDB)

describe("PlanBusiness: FindPlans method", () => {
  test("Sucess Case", async () => {
    const result = await planBusiness.findPlans();
    expect(result[0]).toBeInstanceOf(Plan);
    expect(planDB.findPlans).toBeCalledTimes(1);
  });
});


