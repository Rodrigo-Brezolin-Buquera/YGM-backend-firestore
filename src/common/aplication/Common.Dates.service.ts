import moment from "moment";
import { InvalidInputDate } from "../customError/invalidRequests";
import { IDateService } from "./common.ports";

export class DateService implements IDateService {
  public adjustDate = (date: string): string => {
    if (date.length !== 10) {
      throw new InvalidInputDate();
    }

    if (!date.includes("-")) {
      throw new InvalidInputDate();
    }

    const [year, month, day] = date.split("-");
    if (Number(month) > 12 || Number(month) < 0) {
      throw new InvalidInputDate();
    }

    if (Number(day) > 31 || Number(day) < 0) {
      throw new InvalidInputDate();
    }

    if (year.length !== 4 && Number(year) > 0) {
      throw new InvalidInputDate();
    }

    const result = moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    if (!moment(result, "DD/MM/YYYY").isValid()) {
      throw new InvalidInputDate();
    }
    return result;
  };

  public addOneWeek = (date: string): string  => {
    moment.defineLocale("pt-br", null);
    const momentResult = moment(date, "DD/MM/YYYY").add(1, "weeks");
    const finalDate = moment(momentResult).format("DD/MM/YYYY");
    return finalDate;
  };

 

  public calculateEndDate = (
    date: string,
    durationInMonths: number
  ): string => {
    moment.defineLocale("pt-br", null);
    const momentResult = moment(date).add(durationInMonths, "months");
    const finalDate = moment(momentResult).format("DD/MM/YYYY");
    return finalDate;
  };

   public getToday = (): string  => {
    return moment().format("DD/MM/YYYY");
  };
}
