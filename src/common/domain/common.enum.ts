export enum Frequency {
  ONE = "1x",
  TWO = "2x",
  THREE = "3x",
  FOUR = "4x",
  FIVE = "5x",
  NONE = "---",
}

export enum Type {
  MONTHLY = "Mensal",
  QUARTERLY = "Trimestral",
  SEMIANNUAL = "Semestral",
  ANNUAL = "Anual",
  SINGLE = "Avulsa",
  GYMPASS = "Gympass",
  TOTALPASS = "Totalpass",
}

export enum Day {
  MON = "Segunda",
  TUE = "Terça",
  WED = "Quarta",
  THU = "Quinta",
  FRI = "Sexta",
  SAT = "Sábado",
}

export enum StyleName {
  HATHA = "Hatha Yoga",
  VINYASA = "Vinyasa Flow",
  RESTAURATIVE = "Yoga Restaurativo",
}

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

export const planTable = {
  "1x-Mensal": { availableClasses: 4, durationInMonths: 1 },
  "2x-Mensal": { availableClasses: 8, durationInMonths: 1 },
  "3x-Mensal": { availableClasses: 12, durationInMonths: 1 },
  "1x-Trimestral": { availableClasses: 12, durationInMonths: 3 },
  "2x-Trimestral": { availableClasses: 24, durationInMonths: 3 },
  "3x-Trimestral": { availableClasses: 36, durationInMonths: 3 },
  "1x-Semestral": { availableClasses: 24, durationInMonths: 6 },
  "2x-Semestral": { availableClasses: 48, durationInMonths: 6 },
  "3x-Semestral": { availableClasses: 72, durationInMonths: 6 },
  "Avulsa": { availableClasses: null, durationInMonths: null },
  "Gympass": { availableClasses: null, durationInMonths: null },
  "Totalpass": { availableClasses: null, durationInMonths: null },
};
