import z from "zod"
import { Day, StyleName } from "../../../../common/domain/common.enum"

export interface FindByPeriodDTO {
    dates: string[] ,

}

export const FindByPeriodSchema = z.object({
    dates: z.array(z.string()).optional()
}).transform( data => data as FindByPeriodDTO)

