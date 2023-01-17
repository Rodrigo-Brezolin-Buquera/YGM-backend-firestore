
import { Plan } from "../domain/plans.Entity";

export class PlansFirostoreMapper {

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

}
