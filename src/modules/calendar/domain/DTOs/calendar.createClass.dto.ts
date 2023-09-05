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
  name: z.string().min(3).max(20),
  date:z.string().min(1),
  day: z.string().min(1),
  time: z.string().min(1),
  teacher: z.string().min(1),
  quantity: z.number().int().gt(0).lt(50).optional(),
  capacity: z.number().int().gt(0).lt(30).optional()
}).transform( data => data as CreateClassDTO)

