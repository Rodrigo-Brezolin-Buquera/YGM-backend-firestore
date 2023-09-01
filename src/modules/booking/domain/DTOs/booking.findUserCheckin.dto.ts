import z from "zod"

export interface FindUserCheckinsDTO {
    id: string,
    limit: number,
}  

export const FindUserCheckinsSchema = z.object({
  id:z.string().min(1),
  limit:z.number().int().gt(0).optional()
}).transform( data => data as FindUserCheckinsDTO)