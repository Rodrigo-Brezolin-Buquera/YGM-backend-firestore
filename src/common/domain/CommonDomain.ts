import { CustomError } from "../customError/customError";
import moment from "moment";
import { v4 } from "uuid";
import * as jwt from "jsonwebtoken";
import { InvalidDate, InvalidRequest } from "../customError/invalidRequests";
import { Unauthorized } from "../customError/unauthorized";

export class CommonDomain {
  public static isValidDate(dateString: string) {
    const [day, month, year] = dateString.split("/");
    const date = moment(`${year}-${month}-${day}T00:00:00`);
    if (!date.isValid()) {
      throw new InvalidDate();
    }
  }

  public static compareDates(firstDate: string, secondDate: string) {
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
    return newDate <= oldDate;
  }

  public static adjustDate = (date: string) => {
    return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
  };

  public static checkId(id: string) {
    if (!id) {
      throw new InvalidRequest();
    }
    return this;
  }

  public static generateId() {
    return v4();
  }

  public static getTokenId = (token: string): string => {
    const payload = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as jwt.JwtPayload;
    return payload.id;
  };

  public static verifyUserPermission = (token: string) => {
    try {
      const paylod = jwt.verify(
        token,
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
        token,
        process.env.JWT_KEY as string
      ) as jwt.JwtPayload;
      const admin = payload.admin;

      if (!admin) {
        throw new Unauthorized();;
      }
      return this;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 401);
    }
  };
}
