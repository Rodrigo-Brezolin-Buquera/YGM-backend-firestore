import z from "zod"

export interface DeleteDTO {
    id: string,
    type: string,
}  

export const DeleteSchema = z.object({
    id:z.string().min(1),
    type: z.string().min(1).optional(),
  
}).transform( data => data as DeleteDTO)