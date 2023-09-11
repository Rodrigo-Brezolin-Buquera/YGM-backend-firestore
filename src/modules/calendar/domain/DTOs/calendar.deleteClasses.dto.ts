import z from "zod"
import { zodBoolean, zodString } from "../../../../common/domain/common.zodPatterns"

export interface DeleteClassDTO {
    id: string,
    allClasses?: boolean,
  
}

export const DeleteClassSchema = z.object({
  id: zodString,
  allClasses: zodBoolean
}).transform( data => data as DeleteClassDTO)
