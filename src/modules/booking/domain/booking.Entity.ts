import { CustomError } from "../../../common/customError/customError";
import { CommonDomain } from "../../../common/domain/CommonDomain";

export class Checkin extends CommonDomain{
  constructor(
    public readonly id: string,
    public readonly verified: boolean,
    public readonly name: string,
    public readonly date: string
  ) {
    super()
  }

  public checkName() {
    if (!this.name) {
      throw CustomError.invalidRequest();
    }
    if (this.name.length < 5) {
      throw CustomError.invalidName();
    }
    if (!this.name.includes(" ")) {
      throw CustomError.invalidName();
    }
    return this;
  }

}
