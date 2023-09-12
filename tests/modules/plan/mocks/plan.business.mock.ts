import { Plan } from "../../../../src/common/domain/common.enum";
import { IdDTO } from "../../../../src/common/domain/common.id.dto";
import { PlanRepository } from "../../../../src/modules/plans/business/plan.Repository";
import { CreatePlanDTO } from "../../../../src/modules/plans/domain/DTOs/plan.createPlan.dto";
import { EditPlanDTO } from "../../../../src/modules/plans/domain/DTOs/plan.editPlan.dto";

export class PlanBusinessMock {
  constructor(private planDB: PlanRepository) {}

  public findPlans = jest.fn(async (): Promise<Plan[]> => {
    return [];
  });

  public createPlan = jest.fn(
    async (input: CreatePlanDTO): Promise<void> => {}
  );

  public editPlan = jest.fn(async (input: EditPlanDTO): Promise<void> => {});

  public deletePlan = jest.fn(async ({ id }: IdDTO): Promise<void> => {});
}
