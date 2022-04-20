import { CustomError } from "../customError/customError";
import moment from "moment";
import { v4 } from "uuid";

export class CommonDomain {
  public static isValidDate(dateString: string) {
    const [day, month, year] = dateString.split("/");
    const date = moment(`${year}-${day}-${month}T00:00:00`);
    if (!date.isValid()) {
      throw CustomError.invalidDate();
    }
  }

  public static compareDates(firstDate: string, secondDate: string) {
    const oldDate = moment(firstDate);
    const newDate = moment(secondDate);

    return newDate <= oldDate;
  }

  public checkId(id: string) {
    if (!id) {
      throw CustomError.invalidRequest();
    }
    return this;
  }

  public static generateId () {
    return v4()
  }  
}
