
import z from "zod"
import { zodPayment, zodString } from "../../../../common/domain/common.zodPatterns"

export interface EditPlanDTO {
    id: string,
    price: number
}

export const EditPlanSchema = z.object({
  id:zodString,
  price: zodPayment
}).transform( data => data as EditPlanDTO)