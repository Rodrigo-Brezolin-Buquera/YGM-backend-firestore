import { InvalidInputDate } from "../customError/invalidRequests";

export const formatDate = (date: string) => {
  try {
    const [year, month, day] = date.split("-").map(Number);

    if (!year || !month || !day) {
      throw new InvalidInputDate();
    }

    if (year < 1000 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) {
      throw new InvalidInputDate()
    }

    return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
  } catch (err) {
    throw new InvalidInputDate()
  }
};
