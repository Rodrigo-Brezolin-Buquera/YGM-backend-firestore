import z from "zod"
import { zodDates } from "../../../../common/domain/common.zodPatterns"

export interface FindByPeriodDTO {
    dates: string[] ,

}

export const FindByPeriodSchema = z.object({
  dates: zodDates
}).transform( data => data as FindByPeriodDTO)

