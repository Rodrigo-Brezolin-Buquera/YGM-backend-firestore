import z from "zod"
import { zodString } from "./common.zodPatterns"

export interface IdDTO {
    id: string,
}

export const IdSchema = z.object({
  id:zodString,
  
}).transform( data => data as IdDTO)