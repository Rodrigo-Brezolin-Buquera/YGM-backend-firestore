import { CustomError } from "../customError/customError";


export const validateTime = (time:string) => {
  const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
  if (!timeRegex.test(time)) {
    throw new CustomError("O horário deve ser no formato: `hh:mm`", 400);
  }
}

