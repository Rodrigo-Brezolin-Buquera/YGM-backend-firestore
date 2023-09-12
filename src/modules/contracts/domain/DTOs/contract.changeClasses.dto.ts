import z from "zod"
import { zodClasses, zodString } from "../../../../common/domain/common.zodPatterns"

export interface ChangeClassesDTO {
    id: string,
    availableClasses: number,
}

export const ChangeClassesSchema = z.object({
  id: zodString,
  availableClasses: zodClasses,
}).transform( data => data as ChangeClassesDTO)


