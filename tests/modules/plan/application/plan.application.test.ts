import { PlanBusiness } from "../../../../src/modules/plans/business/Plan.Business";
import {
  EditPlanDTO,
  PlanDTO,
  PlanIdDTO,
} from "../../../../src/modules/plans/domain/plans.DTO";
import { Plan } from "../../../../src/modules/plans/domain/Plan.Entity";
import { TokenServiceMock } from "../../../common/application/mocks/common.token.service.mock";
import { PlanInfrastructureMock } from "./mocks/plan.infrastructure.mock";

const planInfrastructureMock = new PlanInfrastructureMock();
const tokenServiceMock = new TokenServiceMock();

const planApplication = new PlanBusiness(
  planInfrastructureMock,
  
);

describe("FindPlans tests on PlanApplication ", () => {
  test("Sucess Case", async () => {
    const result = await planApplication.findPlans();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toBeInstanceOf(Plan);
    expect(planInfrastructureMock.findPlans).toBeCalledTimes(1);
  });
});

describe("CreatePlan tests on PlanApplication ", () => {
  test("Sucess Case", async () => {
    const input: PlanDTO = {
      type: "Mensal",
      frequency: "1x",
      availableClasses: 10,
      durationInMonths: 1,
      token: "TOKEN",
      monthlyPayment: "R$ 100,00",
    };
    const result = await planApplication.createPlan(input);
    expect(result).toBeUndefined();
    expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1);
    expect(planInfrastructureMock.postPlan).toBeCalledTimes(1);
  });
});

describe("EditPlan tests on PlanApplication ", () => {
  test("Sucess Case", async () => {
    const input: EditPlanDTO = {
      type: "Mensal",
      id: "ID",
      frequency: "1x",
      availableClasses: 5,
      durationInMonths: 3,
      token: "TOKEN",
      monthlyPayment: "R$ 90,00",
    };
    const result = await planApplication.editPlan(input);
    expect(result).toBeUndefined();
    expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1);
    expect(planInfrastructureMock.editPlan).toBeCalledTimes(1);
  });
});

describe("DeletePlan tests on PlanApplication ", () => {
  test("Sucess Case", async () => {
    const input: PlanIdDTO = {
      id: "ID",

      token: "TOKEN",
    };
    const result = await planApplication.deletePlan(input);
    expect(result).toBeUndefined();
    expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1);
    expect(planInfrastructureMock.deletePlan).toBeCalledTimes(1);
  });
});
