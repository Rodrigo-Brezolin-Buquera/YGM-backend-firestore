import z from "zod"

export interface EditFirmDTO {
    address: string;
    email: string;
    facebook: string;
    instagram: string;
    phone: string;
    website: string;
    whatsapp: string;
  }

  export const EditFirmSchema = z.object({
    address: z.string().min(1),
    email: z.string().min(1),
    facebook: z.string().min(1),
    instagram: z.string().min(1),
    phone: z.string().min(1),
    website: z.string().min(1),
    whatsapp: z.string().min(1),
  }).transform((data) => data as EditFirmDTO);