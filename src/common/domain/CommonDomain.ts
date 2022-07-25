import { CustomError } from "../customError/customError";
import moment from "moment";
import { v4 } from "uuid";
import * as jwt from "jsonwebtoken";
import {
  InvalidDate,
  InvalidId,
  InvalidInputDate,
  InvalidRequest,
} from "../customError/invalidRequests";
import { Unauthorized } from "../customError/unauthorized";
import { IncompatibleDates } from "../customError/conflicts";

export class CommonDomain {
  public static isValidDate(dateString: string) {
    try {
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
    } catch (error) {
      throw new CustomError(error.message, error.statusCode);
    }
  }

  public static compareDates(firstDate: string, secondDate: string): boolean {
    try {
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

      return newDate >= oldDate;;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode);
    }
  }

  public static adjustDate = (date: string): string => {
    try {
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
    } catch (error) {
      throw new CustomError(error.message, error.statusCode);
    }
  };

  public static checkId(id: string) {
    try {
      if (!id) {
        throw new InvalidId();
      }

      if (typeof id !== "string") {
        throw new InvalidId();
      }
      return this;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode);
    }
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
      const paylod = jwt.verify(
        token?.trim(),
        process.env.JWT_KEY as string
      ) as jwt.JwtPayload;

      if (!paylod) {
        throw new Unauthorized();
      }

      return this;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 401);
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
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 401);
    }
  };
}
