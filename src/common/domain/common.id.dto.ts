import z from "zod"

export interface IdDTO {
    id: string,
}

export const IdSchema = z.object({
    id:z.string().min(1),
  
}).transform( data => data as IdDTO)