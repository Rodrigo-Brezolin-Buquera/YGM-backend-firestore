import z from "zod"
import { zodString } from "../../../../common/domain/common.zodPatterns";

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
    address: zodString,
    email: zodString,
    facebook: zodString,
    instagram: zodString,
    phone: zodString,
    website: zodString,
    whatsapp: zodString,
  }).transform((data) => data as EditFirmDTO);