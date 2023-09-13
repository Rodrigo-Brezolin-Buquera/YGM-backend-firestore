
type PlanTable = {
  [key: string]: {
    availableClasses: number | null;
    durationInMonths: number | null;
  };
};


export const planTable:PlanTable = {
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
  