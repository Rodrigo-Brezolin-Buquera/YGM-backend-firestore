import z from "zod"

export interface CreatePlanDTO {
    type: string
    frequency: string;
    availableClasses: number,
    durationInMonths: number,
    monthlyPayment: number
}

export const CreatePlanSchema = z.object({
    type: z.string().min(1),
    frequency: z.string().min(2).max(3),
    availableClasses: z.number().int().gt(0).lt(200),
    durationInMonths: z.number().int().gte(0).lte(12),
    monthlyPayment: z.number().int().gt(0).lt(400)
}).transform( data => data as CreatePlanDTO)