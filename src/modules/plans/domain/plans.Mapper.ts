import { PlanDTO, PlanIdDTO } from "./plans.DTO";
import { Plan } from "./plans.Entity";


export class PlansMapper {

    public static toModelPlan(obj: any): Plan {
        const result = new Plan(
          obj.id,
          obj.type,
          obj.frequency,
          obj.availableClasses,
          obj.durationInMonths
        );
        return result;
      }

      public static toModelFireStorePlan(obj: Plan): any {
        return {
            id:  obj.id,
            type:  obj.type,
            frequency:  obj.frequency,
            availableClasses: obj.availableClasses,
            durationInMonths:obj.durationInMonths
        }        
      }

      public static toModelPlanDTO(obj: any): PlanDTO {
        return {
            type:  obj.type,
            frequency:  obj.frequency,
            availableClasses: obj.availableClasses,
            durationInMonths:obj.durationInMonths
        }        
      }

      public static toModelPlanIdDTO(obj: any): PlanIdDTO {
        return { id:  obj.id }        
      }


} 