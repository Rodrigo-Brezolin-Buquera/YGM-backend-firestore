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

      public static toModelPlanDTO(req: any): PlanDTO {
        return {
            type: req.body.type,
            frequency:  req.body.frequency,
            availableClasses: req.body.availableClasses,
            durationInMonths:req.body.durationInMonths
        }        
      }

      public static toModelPlanIdDTO(req: any): PlanIdDTO {
        return { id:  req.body.id }        
      }


} 