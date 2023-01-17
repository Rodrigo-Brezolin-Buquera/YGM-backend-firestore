import { EditPlanDTO, PlanDTO, PlanIdDTO } from "../domain/plans.DTO";


export class PlansDTOMapper {
 

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
