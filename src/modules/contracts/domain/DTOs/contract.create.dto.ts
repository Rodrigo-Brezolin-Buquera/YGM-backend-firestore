import z from "zod"
import { zodName, zodString } from "../../../../common/domain/common.zodPatterns"

export interface CreateContractDTO {
    id: string,
    name: string ,
    plan: string,
    started: string,
}

export const CreateContractSchema = z.object({
  id: zodString,
  name: zodName,
  plan: zodString,
  started: zodString
}).transform( data => data as CreateContractDTO)



