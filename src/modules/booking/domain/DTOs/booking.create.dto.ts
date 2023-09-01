import z from "zod"

export interface CreateCheckinDTO {
    contractId: string,
    yogaClassId: string,
    date: string,
    name: string,
    time: string,
    type: string
}  

export const CreateCheckinSchema = z.object({
    contractId:z.string().min(1),
    yogaClassId:z.string().min(1),
    date: z.string().min(1),
    name: z.string().min(1),
    time: z.string().min(1),
    type: z.string().min(1).optional(),
}).transform( data => data as CreateCheckinDTO)