import z from "zod"
import { zodPayment, zodString } from "../../../../common/domain/common.zodPatterns";

export interface CreatePlanDTO {
    type: string
    frequency: string;
    price: number
}

export const CreatePlanSchema = z.object({
  type: zodString,
  frequency: zodString,
  price: zodPayment
}).transform( data => data as CreatePlanDTO)