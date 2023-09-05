import z from "zod"
import { Day, StyleName } from "../../../../common/domain/common.enum"
import { zodCapacity, zodName, zodQuantity, zodString } from "../../../../common/domain/common.zodPatterns"

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
  name: zodName,
  date:zodString,
  day: zodString,
  time: zodString,
  teacher: zodString,
  quantity: zodQuantity,
  capacity: zodCapacity
}).transform( data => data as CreateClassDTO)

