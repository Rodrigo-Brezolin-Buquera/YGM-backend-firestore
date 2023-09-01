import z from "zod"
import { Plan } from "../../../../common/domain/common.enum"

export interface ChangePlanDTO {
    id: string,
    plan: Plan,
    started: string,
}

export const ChangePlanSchema = z.object({
  id: z.string().min(1),
  plan: z.string().min(1),
  started: z.string().min(1)
}).transform( data => data as ChangePlanDTO)


