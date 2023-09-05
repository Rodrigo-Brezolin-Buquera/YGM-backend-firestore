import z from "zod"
import { zodOptionalString, zodString } from "../../../../common/domain/common.zodPatterns"

export interface CreateCheckinDTO {
    contractId: string,
    yogaClassId: string,
    date: string,
    name: string,
    time: string,
    type: string
}  

export const CreateCheckinSchema = z.object({
  contractId:zodString,
  yogaClassId:zodString,
  date: zodString,
  name: zodString,
  time: zodString,
  type: zodOptionalString
}).transform( data => data as CreateCheckinDTO)