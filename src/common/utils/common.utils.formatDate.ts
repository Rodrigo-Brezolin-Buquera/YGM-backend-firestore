import { InvalidInputDate } from "../customError/invalidRequests";

export const formatDate = (date: string) => {
  try {
    const [year, month, day] = date.split("-");

    if (!year || !month || !day) {
      throw new InvalidInputDate();
    }

    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  } catch (err) {
    throw new InvalidInputDate()
  }
};
