import z from "zod"

export interface LoginDTO {
    email:string,
    password:string  
}

export const LoginSchema = z.object({
    email:z.string().email(),
    password: z.string().min(1)
  
}).transform( data => data as LoginDTO)



