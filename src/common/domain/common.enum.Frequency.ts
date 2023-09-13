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
      "A frequências das aulas precisa ser: 1x, 2x, 3x ou ---",
      400
    );
  }
}