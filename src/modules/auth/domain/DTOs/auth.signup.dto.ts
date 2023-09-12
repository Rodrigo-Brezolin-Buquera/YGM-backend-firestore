import z from "zod"
import { zodName, zodString } from "../../../../common/domain/common.zodPatterns"

export interface SignupDTO {
    token: string,
    name: string
}

export const SignupSchema = z.object({
  name: zodName,
  token:zodString
}).transform( data => data as SignupDTO)

