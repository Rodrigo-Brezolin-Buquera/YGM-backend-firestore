
import z from "zod"

export interface EditPlanDTO {
    id: string,
    monthlyPayment: string
}

export const EditPlanSchema = z.object({
    id:z.string().min(1),
    monthlyPayment: z.string().min(8).max(10)
}).transform( data => data as EditPlanDTO)