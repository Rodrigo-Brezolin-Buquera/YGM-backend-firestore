
import z from "zod"
import { zodPayment, zodString } from "../../../../common/domain/common.zodPatterns"

export interface EditPlanDTO {
    id: string,
    monthlyPayment: number
}

export const EditPlanSchema = z.object({
  id:zodString,
  monthlyPayment: zodPayment
}).transform( data => data as EditPlanDTO)