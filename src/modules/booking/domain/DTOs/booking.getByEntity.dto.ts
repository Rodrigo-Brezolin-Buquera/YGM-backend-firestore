import z from "zod"
import { zodOptinonalNumber, zodString } from "../../../../common/domain/common.zodPatterns"

export interface FindCheckinDTO {
    id: string,
    entity: string,
    limit?: number
}  

export const FindCheckinchema = z.object({
  id:zodString,
  entity: zodString,
  limit: zodOptinonalNumber
  
}).transform( data => data as FindCheckinDTO)