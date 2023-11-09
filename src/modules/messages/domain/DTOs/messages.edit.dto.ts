import z from "zod"
import { zodString  } from "../../../../common/domain/common.zodPatterns";

export interface EditMessageDTO {
    id: string;
    message: string;
}

export const EditFirmSchema = z.object({
  id: zodString,
  message: zodString  
}).transform((data) => data as EditMessageDTO);