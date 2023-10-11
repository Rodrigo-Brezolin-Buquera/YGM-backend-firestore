import z from "zod"
import { zodCapacity, zodName, zodQuantity, zodString } from "../../../../common/domain/common.zodPatterns"

export interface CreateClassDTO {
    name: string,
    date: string,
    day: string,
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

