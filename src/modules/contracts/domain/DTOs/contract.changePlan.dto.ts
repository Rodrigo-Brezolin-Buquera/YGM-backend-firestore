import z from "zod"
import { zodString } from "../../../../common/domain/common.zodPatterns"

export interface ChangePlanDTO {
    id: string,
    plan: string,
    started: string,
}

export const ChangePlanSchema = z.object({
  id: zodString,
  plan: zodString,
  started: zodString
}).transform( data => data as ChangePlanDTO)


