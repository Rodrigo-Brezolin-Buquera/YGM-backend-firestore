import z from "zod"
import { zodString } from "../../../../common/domain/common.zodPatterns"

export interface CreateSingleDTO {
    yogaClassId: string,
    date: string,
    name: string,
    time: string,
    plan: string
}  

export const CreateSingleSchema = z.object({
  yogaClassId:zodString,
  date: zodString,
  name: zodString,
  time: zodString,
  plan: zodString
}).transform( data => data as CreateSingleDTO)