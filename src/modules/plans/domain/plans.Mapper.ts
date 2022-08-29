import { EditPlanDTO, PlanDTO, PlanIdDTO } from "./plans.DTO";
import { Plan } from "./plans.Entity";

export class PlansMapper {
  public static toPlan(obj: any): Plan {
    const result = new Plan(
      obj.id,
      obj.type,
      obj.frequency,
      obj.availableClasses,
      obj.durationInMonths,
      obj.monthlyPayment
    );
    return result;
  }

  public static toFireStorePlan(obj: Plan): any {
    return {
      id: obj.id,
      type: obj.type,
      frequency: obj.frequency,
      availableClasses: obj.availableClasses,
      durationInMonths: obj.durationInMonths,
      monthlyPayment: obj.monthlyPayment,
    };
  }

  public static toPlanDTO(req: any): PlanDTO {
    return {
      type: req.body.type?.trim(),
      frequency: req.body.frequency?.trim(),
      availableClasses: req.body.availableClasses,
      durationInMonths: req.body.durationInMonths,
      monthlyPayment: req.body.monthlyPayment?.trim(),
      token: req.headers.authorization!,
    };
  }

  public static toEditPlanDTO(req: any): EditPlanDTO {
    return {
      id: req.params.id,
      type: req.body.type?.trim(),
      frequency: req.body.frequency?.trim(),
      availableClasses: req.body.availableClasses,
      durationInMonths: req.body.durationInMonths,
      monthlyPayment: req.body.monthlyPayment?.trim(),
      token: req.headers.authorization!,
    };
  }

  public static toPlanIdDTO(req: any): PlanIdDTO {
    return {
      id: req.params.id,
      token: req.headers.authorization!,
    };
  }
}
