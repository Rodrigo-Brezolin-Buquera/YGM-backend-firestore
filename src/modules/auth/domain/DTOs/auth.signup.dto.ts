import z from "zod"

export interface SignupDTO {
    email: string,
    name: string,
    password: string
}

export const SignupSchema = z.object({
  name: z.string().min(2).max(30),
  email:z.string().email(),
  password: z.string().min(1)
  
}).transform( data => data as SignupDTO)

