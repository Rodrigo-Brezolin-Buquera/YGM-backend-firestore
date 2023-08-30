import z from "zod"

export interface PlanIdDTO {
    id: string,
}

export const PlanIdSchema = z.object({
    id:z.string().min(1),
  
}).transform( data => data as PlanIdDTO)