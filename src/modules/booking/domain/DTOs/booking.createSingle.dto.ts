import z from "zod"

export interface CreateSingleDTO {
    yogaClassId: string,
    date: string,
    name: string,
    time: string
}  

export const CreateSingleSchema = z.object({
  yogaClassId:z.string().min(1),
  date: z.string().min(1),
  name: z.string().min(1),
  time: z.string().min(1),
}).transform( data => data as CreateSingleDTO)