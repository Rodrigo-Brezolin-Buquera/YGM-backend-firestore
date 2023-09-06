import z from "zod"
import { zodEmail, zodOptionalString, zodString } from "../../../../common/domain/common.zodPatterns";

export interface EditFirmDTO {
    address?: string;
    email?: string;
    facebook?: string;
    instagram?: string;
    phone?: string;
    website?: string;
    whatsapp?: string;
  }

  export const EditFirmSchema = z.object({
    address: zodOptionalString,
    email: zodEmail.optional(),
    facebook: zodOptionalString,
    instagram: zodOptionalString,
    phone: zodOptionalString,
    website: zodOptionalString,
    whatsapp: zodOptionalString,
  }).transform((data) => data as EditFirmDTO);