import z from "zod"
import { zodEmail, zodString } from "../../../../common/domain/common.zodPatterns"

export interface LoginDTO {
    token:string
}

export const LoginSchema = z.object({
  token:zodString,
  
}).transform( data => data as LoginDTO)



