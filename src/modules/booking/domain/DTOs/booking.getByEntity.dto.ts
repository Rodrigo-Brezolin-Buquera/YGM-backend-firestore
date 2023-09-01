import z from "zod"

export interface FindCheckinDTO {
    id: string,
    entity: string,
}  

export const FindCheckinchema = z.object({
    id:z.string().min(1),
    entity: z.string().min(1),
  
}).transform( data => data as FindCheckinDTO)