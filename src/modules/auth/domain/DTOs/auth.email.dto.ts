import z from "zod"
import { zodEmail } from "../../../../common/domain/common.zodPatterns"

export interface EmailDTO {
    email:string,
}

export const EmailSchema = z.object({
  email:zodEmail
}).transform( data => data as EmailDTO)



