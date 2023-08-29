import z from "zod"

export interface CreatePlanDTO {
    type: string
    frequency: string;
    availableClasses: number,
    durationInMonths: number,
    monthlyPayment: string
}

export const CreatePlanSchema = z.object({
    type: z.string().min(1),
    frequency: z.string().min(2).max(3),
    availableClasses: z.number().int().gt(0),
    durationInMonths: z.number().int().gte(0).lte(12),
    monthlyPayment: z.string().min(8).max(10)
}).transform( data => data as CreatePlanDTO)