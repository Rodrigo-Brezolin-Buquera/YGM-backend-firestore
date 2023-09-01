import z from "zod"

export interface ChangeClassesDTO {
    id: string,
    availableClasses: number,
}

export const ChangeClassesSchema = z.object({
  id: z.string().min(1),
  availableClasses: z.number().int().gt(0).lt(200),
}).transform( data => data as ChangeClassesDTO)


