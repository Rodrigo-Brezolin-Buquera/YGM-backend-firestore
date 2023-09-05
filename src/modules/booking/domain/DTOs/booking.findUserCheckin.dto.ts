import z from "zod"
import { zodLimit, zodString } from "../../../../common/domain/common.zodPatterns"

export interface FindUserCheckinsDTO {
    id: string,
    limit: number,
}  

export const FindUserCheckinsSchema = z.object({
  id: zodString,
  limit:zodLimit
}).transform( data => data as FindUserCheckinsDTO)