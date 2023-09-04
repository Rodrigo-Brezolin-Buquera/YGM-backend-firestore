import z from "zod"

export interface SignupDTO {
    token: string,
    name: string
}

export const SignupSchema = z.object({
  name: z.string().min(2).max(30),
  token:z.string().min(1)
}).transform( data => data as SignupDTO)

