import { CustomError } from "../customError/customError";

export enum Plan {
  MONTHLYX1 = "1x-Mensal",
  MONTHLYX2 = "2x-Mensal",
  MONTHLYX3 = "3x-Mensal",
  QUARTERLYX1 = "1x-Trimestral",
  QUARTERLYX2 = "2x-Trimestral",
  QUARTERLYX3 = "3x-Trimestral",
  SEMIANNUALX1 = "1x-Semestral",
  SEMIANNUALX2 = "2x-Semestral",
  SEMIANNUALX3 = "3x-Semestral",
  SINGLE = "Avulsa",
  GYMPASS = "Gympass",
  TOTALPASS = "Totalpass",
}

export const stringToPlan = (value: string): Plan => {
  switch (value) {
  case "1x-Mensal":
    return Plan.MONTHLYX1;
  case "2x-Mensal":
    return Plan.MONTHLYX2;
  case "3x-Mensal":
    return Plan.MONTHLYX3;
  case "1x-Trimestral":
    return Plan.QUARTERLYX1;
  case "2x-Trimestral":
    return Plan.QUARTERLYX2;
  case "3x-Trimestral":
    return Plan.QUARTERLYX3;
  case "1x-Semestral":
    return Plan.SEMIANNUALX1;
  case "2x-Semestral":
    return Plan.SEMIANNUALX1;
  case "3x-Semestral":
    return Plan.SEMIANNUALX3;
  case "Avulsa":
    return Plan.SINGLE;
  case "Gympass":
    return Plan.GYMPASS;
  case "Totalpass":
    return Plan.TOTALPASS;
  default:
    throw new CustomError("Plano inválido", 400);
  }
};
