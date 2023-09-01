import z from "zod"

export interface FindCheckinDTO {
    id: string,
    entity: string,
    limit: number
}  

export const FindCheckinchema = z.object({
    id:z.string().min(1),
    entity: z.string().min(1),
    limit:z.number().int().gt(0).optional()
  
}).transform( data => data as FindCheckinDTO)