import moment from "moment";
import { v4 } from "uuid";
import * as jwt from "jsonwebtoken";
import {
  InvalidDate,
  InvalidId,
  InvalidInputDate
} from "../customError/invalidRequests";
import {
  InvalidSignature,
  TokenExpired,
  Unauthorized,
} from "../customError/unauthorized";
import { IncompatibleDates } from "../customError/conflicts";

export class CommonDomain {
  public static checkDate(dateString: string) {
    const [day, month, year] = dateString.split("/");
    if (Number(month) > 12 || Number(month) < 0) {
      throw new InvalidDate();
    }

    if (Number(day) > 31 || Number(day) < 0) {
      throw new InvalidDate();
    }

    if (year?.length !== 4 && Number(year) > 0) {
      throw new InvalidDate();
    }
    const date = new Date(`${year}-${month}-${day}T00:00:00`); // verificar se deu certo
    if (!date) {
      throw new InvalidDate();
    }
  }

  public static compareDates(firstDate: string, secondDate: string): boolean {
    if (firstDate === secondDate) {
      throw new IncompatibleDates();
    }

    const [dayOld, monthOld, yearOld] = firstDate.split("/");
    const oldDate = new Date(
      Number(yearOld),
      Number(monthOld),
      Number(dayOld)
    ).getTime();
    const [dayNew, monthNew, yearNew] = secondDate.split("/");
    const newDate = new Date(
      Number(yearNew),
      Number(monthNew),
      Number(dayNew)
    ).getTime();

    return newDate >= oldDate;
  }

  public static checkId(id: string) {
    if (!id) {
      throw new InvalidId();
    }
    return this;
  }

}
