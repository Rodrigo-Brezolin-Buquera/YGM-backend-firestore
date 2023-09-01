import { CustomError } from "../../../common/customError/customError";
import { PlanNotFound } from "../../../common/customError/notFound";
import { IdDTO } from "../../../common/domain/common.id.dto";
import { CreatePlanDTO } from "../domain/DTOs/plan.createPlan.dto";
import { EditPlanDTO } from "../domain/DTOs/plan.editPlan.dto";
import { Plan, SimplePlan } from "../domain/plan.Entity";
import { PlanRepository } from "./plan.Repository";
import {formatPrice} from "./plan.utils.formatPrice"

export class PlanBusiness {
  constructor(private planDB: PlanRepository) {}

  public async findPlans(): Promise<Plan[]> {
    return await this.planDB.findPlans();
  }

  public async createPlan(input: CreatePlanDTO): Promise<void> {
    const { type, frequency, monthlyPayment  } = input;
    const id =  frequency ? `${frequency}-${type}` : type

    const alreadyExists = await this.planDB.findPlan(id)
    if(alreadyExists){
      throw new CustomError("Plano já existe", 409);
    }

    const plan = Plan.toModel({
      id,
      type,
      frequency,
      monthlyPayment: formatPrice(monthlyPayment, 2),
      availableClasses: input.availableClasses,
      durationInMonths: input.durationInMonths
    });
    await this.planDB.postPlan(plan);
  }

  public async editPlan(input: EditPlanDTO): Promise<void> {
    const { id, monthlyPayment } = input;
    const plan = await this.planDB.findPlan(id);

    if(!plan){
      throw new PlanNotFound();
    }

    if (plan instanceof SimplePlan) {
      throw new CustomError("Valores não se aplicam a este plano", 400);
    }

    plan.setMonthlyPayment(formatPrice(monthlyPayment, 2));
    await this.planDB.editPlan(plan);
  }

  public async deletePlan({ id }: IdDTO): Promise<void> {
    await this.planDB.deletePlan(id);
  }
}
