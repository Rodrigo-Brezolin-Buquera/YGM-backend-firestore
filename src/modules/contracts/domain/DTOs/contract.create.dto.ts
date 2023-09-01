import z from "zod"
import { Plan } from "../../../../common/domain/common.enum"

export interface CreateContractDTO {
    id: string,
    name: string ,
    plan: Plan,
    started: string,
}

export const CreateContractSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2).max(30),
  plan: z.string().min(1),
  started: z.string().min(1)
}).transform( data => data as CreateContractDTO)



