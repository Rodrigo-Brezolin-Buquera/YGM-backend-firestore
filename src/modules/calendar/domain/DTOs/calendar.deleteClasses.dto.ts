import z from "zod"

export interface DeleteClassDTO {
    id: string,
    allClasses: boolean,
  
}

export const DeleteClassSchema = z.object({
  id: z.string().min(1),
  allClasses: z.boolean().optional()
}).transform( data => data as DeleteClassDTO)
