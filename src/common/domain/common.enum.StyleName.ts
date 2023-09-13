import { CustomError } from "../customError/customError";

export enum StyleName {
  HATHA = "Hatha Yoga",
  VINYASA = "Vinyasa Flow",
  RESTAURATIVE = "Yoga Restaurativo",
}

export const stringToStyleName = (value: string): StyleName => {
  switch (value) {
  case "Hatha Yoga":
    return StyleName.HATHA;
  case "Vinyasa Flow":
    return StyleName.VINYASA;
  case "Yoga Restaurativo":
    return StyleName.RESTAURATIVE;

  default:
    throw new CustomError(
      "A aula precisa ser: Hatha Yoga, Vinyasa Flow ou Yoga Restaurativo",
      400
    );
  }
};
