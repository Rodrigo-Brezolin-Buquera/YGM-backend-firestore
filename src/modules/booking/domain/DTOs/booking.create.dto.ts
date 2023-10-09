import z from "zod"
import { zodString } from "../../../../common/domain/common.zodPatterns"

export interface CreateCheckinDTO {
    contractId: string,
    yogaClassId: string,
    date: string,
    name: string,
    time: string,
    plan: string
}  

export const CreateCheckinSchema = z.object({
  contractId:zodString,
  yogaClassId:zodString,
  date: zodString,
  name: zodString,
  time: zodString,
  plan: zodString
}).transform( data => data as CreateCheckinDTO)