import z from "zod"

export interface LoginDTO {
    token:string,
}

export const LoginSchema = z.object({
  token:z.string().min(1),
  
}).transform( data => data as LoginDTO)



