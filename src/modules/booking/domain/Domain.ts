import { CustomError } from "../../../common/customError/customError";
import { isValidDate } from "../../../common/services/moment";

export class Checkin {
  constructor(
    public readonly id: string,
    public readonly verified: boolean,
    public readonly name?: string,
    public readonly date?: string
  ) {}

  // public checkDate() {
  //   isValidDate(this.date);
  //   return this;
  // }

  // public checkName() {
  //   if (!this.name) {
  //     throw CustomError.invalidRequest;
  //   }
  //   if (this.name.length < 5) {
  //     throw CustomError.invalidName();
  //   }
  //   if (!this.name.includes(" ")) {
  //     throw CustomError.invalidName();
  //   }
  //   return this;
  // }

  public checkId(id:string) {
    if (!id) {
      throw CustomError.invalidRequest();
    }
    return this;
  }
}
