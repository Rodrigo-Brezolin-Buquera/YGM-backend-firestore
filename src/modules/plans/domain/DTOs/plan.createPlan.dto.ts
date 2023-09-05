import z from "zod"
import { zodClasses, zodMonths, zodPayment, zodString } from "../../../../common/domain/common.zodPatterns";

export interface CreatePlanDTO {
    type: string
    frequency: string;
    availableClasses: number,
    durationInMonths: number,
    monthlyPayment: number
}

export const CreatePlanSchema = z.object({
  type: zodString,
  frequency: zodString,
  availableClasses: zodClasses,
  durationInMonths: zodMonths,
  monthlyPayment: zodPayment
}).transform( data => data as CreatePlanDTO)