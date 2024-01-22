import z from "zod"
import { zodOptionalString, zodString  } from "../../../../common/domain/common.zodPatterns";

export interface EditMessageDTO {
    id: string;
    message: string;
}

export const EditFirmSchema = z.object({
  id: zodString,
  message: zodOptionalString  
}).transform((data) => data as EditMessageDTO);