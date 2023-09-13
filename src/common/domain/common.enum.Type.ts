import { CustomError } from "../customError/customError";

export enum Type {
  MONTHLY = "Mensal",
  QUARTERLY = "Trimestral",
  SEMIANNUAL = "Semestral",
  ANNUAL = "Anual",
  SINGLE = "Avulsa",
  GYMPASS = "Gympass",
  TOTALPASS = "Totalpass",
}

export const stringToType = (value: string): Type => {
  switch (value) {
  case "Mensal":
    return Type.MONTHLY;
  case "Trimestral":
    return Type.QUARTERLY;
  case "Semestral":
    return Type.SEMIANNUAL;
  case "Anual":
    return Type.ANNUAL;
  case "Avulsa":
    return Type.SINGLE;
  case "Gympass":
    return Type.GYMPASS;
  case "Totalpass":
    return Type.TOTALPASS;
  default:
    throw new CustomError(
      "O tipo do plano precisa ser: Mensal, Trimestral, Semestral, Avulsa, Gympass ou Totalpass",
      400
    );
  }
};
