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
  public static isValidDate(dateString: string) {
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
    const date = moment(`${year}-${month}-${day}T00:00:00`);
    if (!date.isValid()) {
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

  public static adjustDate = (date: string): string => {
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

  public static checkId(id: string) {
    if (!id) {
      throw new InvalidId();
    }

    if (typeof id !== "string") {
      throw new InvalidId();
    }
    return this;
  }

  public static generateId(): string {
    return v4();
  }

  public static getTokenId = (token: string): string => {
    const payload = jwt.verify(
      token?.trim(),
      process.env.JWT_KEY as string
    ) as jwt.JwtPayload;
    return payload.id;
  };

  public static verifyUserPermission = (token: string) => {
    try {
      const payload = jwt.verify(
        token?.trim(),
        process.env.JWT_KEY as string
      ) as jwt.JwtPayload;

      return this;
    } catch (error: any) {
      this.jwtErrorFilter(error);
    }
  };

  public static verifyAdminPermission = (token: string) => {
    try {
      const payload = jwt.verify(
        token?.trim(),
        process.env.JWT_KEY as string
      ) as jwt.JwtPayload;
      const admin = payload.admin;

      if (!admin) {
        throw new Unauthorized();
      }
      return this;
    } catch (error: any) {
      this.jwtErrorFilter(error);
    }
  };

  private static jwtErrorFilter = (error: any): void => {
    if (error.message === "jwt expired") {
      throw new TokenExpired();
    }

    if (error.message === "jwt must be provided") {
      throw new InvalidSignature();
    }

    if (error.message === "jwt malformed") {
      throw new InvalidSignature();
    }

    if (error.message === "secret or public key must be provided") {
      throw new InvalidSignature();
    }

    throw new Unauthorized();
  };

  public static checkEmptyInput = (input: any): void => {
    // const isEmpty = (value: any): boolean => {
    //   return value === undefined || value === null || value === "";
    // };
    // const checkEmptyObject = (obj: any): boolean => {
    //   const values = Object.values(obj);
    //   for (let value of values) {
    //     if (isEmpty(value)) {
    //       return true;
    //     }
    //   }
    //   return false;
    // };
    // const result = checkEmptyObject(input);
    // if (result) {
    //   throw new InvalidRequest();
    // }
  };
}
