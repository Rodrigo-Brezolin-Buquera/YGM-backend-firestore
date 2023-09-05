import z from "zod"
import { zodOptionalString, zodString } from "../../../../common/domain/common.zodPatterns"

export interface DeleteDTO {
    id: string,
    type: string,
}  

export const DeleteSchema = z.object({
  id: zodString,
  type: zodOptionalString,
  
}).transform( data => data as DeleteDTO)