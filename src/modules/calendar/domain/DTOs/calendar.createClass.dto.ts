import z from "zod"
import { Day, StyleName } from "../../../../common/domain/common.enum"

export interface CreateClassDTO {
    name: StyleName,
    date: string,
    day: Day,
    time: string,
    teacher: string,
    quantity: number,
    capacity: number
}

export const CreateClassSchema = z.object({
    name: z.string().min(5).max(20),
    date:z.string().min(8).max(10),
    day: z.string().min(5).max(8),
    time: z.string().length(5),
    teacher: z.string().min(1),
    quantity: z.number().gt(0).lt(50).optional(),
    capacity: z.number().gt(0).lt(30).optional()
}).transform( data => data as CreateClassDTO)

