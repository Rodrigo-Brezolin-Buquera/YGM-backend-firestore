import z from "zod"

export interface EmailDTO {
    email:string,
}

export const EmailSchema = z.object({
    email:z.string().email()
}).transform( data => data as EmailDTO)



