
import z from "zod"

export interface EditPlanDTO {
    id: string,
    monthlyPayment: number
}

export const EditPlanSchema = z.object({
    id:z.string().min(1),
    monthlyPayment: z.number().int().gt(0).lt(400)
}).transform( data => data as EditPlanDTO)