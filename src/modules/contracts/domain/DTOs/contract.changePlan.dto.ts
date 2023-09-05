import z from "zod"
import { Plan } from "../../../../common/domain/common.enum"
import { zodString } from "../../../../common/domain/common.zodPatterns"

export interface ChangePlanDTO {
    id: string,
    plan: Plan,
    started: string,
}

export const ChangePlanSchema = z.object({
  id: zodString,
  plan: zodString,
  started: zodString
}).transform( data => data as ChangePlanDTO)


