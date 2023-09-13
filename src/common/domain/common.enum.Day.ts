import { CustomError } from "../customError/customError";

export enum Day {
  MON = "Segunda",
  TUE = "Terça",
  WED = "Quarta",
  THU = "Quinta",
  FRI = "Sexta",
  SAT = "Sábado",
}

export const stringToDay = (value: string): Day => {
  switch (value) {
  case "Segunda":
    return Day.MON;
  case "Terça":
    return Day.TUE;
  case "Quarta":
    return Day.WED;
  case "Quinta":
    return Day.THU;
  case "Sexta":
    return Day.FRI;
  case "Sábado":
    return Day.SAT;

  default:
    throw new CustomError("Dia de aula inválido", 400);
  }
};
