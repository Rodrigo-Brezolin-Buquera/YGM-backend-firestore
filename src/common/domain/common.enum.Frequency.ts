import { CustomError } from "../customError/customError";

export enum Frequency {
    ONE = "1x",
    TWO = "2x",
    THREE = "3x",
    NONE = "---",
  }

export const stringToFrequency = (value: string): Frequency =>{
  switch (value) {
  case "1x":
    return Frequency.ONE;
  case "2x":
    return Frequency.TWO;
  case "3x":
    return Frequency.THREE;
  case "---":
    return Frequency.NONE;
  default:
    throw new CustomError(
      "O tipo do plano precisa ser: Mensal, Trimestral, Semestral, Avulsa, Gympass ou Totalpass",
      400
    );
  }
}