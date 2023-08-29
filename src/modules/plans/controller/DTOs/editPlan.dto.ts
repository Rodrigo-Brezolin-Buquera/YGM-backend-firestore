
import z from "zod"

export interface EditPlanDTO {
    id: string,
    type: string
    frequency: string;
    availableClasses: number,
    durationInMonths: number,
    monthlyPayment: string
}



export const EditPlanSchema = z.object({
    id:z.string().min(1),
    type: z.string().min(1),
    frequency: z.string().min(1).max(3),
    availableClasses: z.number().int().gt(0),
    durationInMonths: z.number().int().gte(0).lte(12),
    monthlyPayment: z.string().min(8).max(10)
}).transform( data => data as EditPlanDTO)