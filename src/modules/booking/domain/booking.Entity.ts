import { CustomError } from "../../../common/customError/customError";
import { InvalidName, InvalidRequest } from "../../../common/customError/invalidRequests";
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
      throw new InvalidRequest()
    }
    if (this.name.length < 5) {
      throw new InvalidName()
    }
    if (!this.name.includes(" ")) {
      throw new InvalidName()
    }
    return this;
  }

}
