import { CustomError } from "../../../common/customError/customError";
import { InvalidName, InvalidVerified } from "../../../common/customError/invalidRequests";
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
    try {
      if (!this.name) {
        throw new InvalidName()
      }
      if (this.name.length < 5) {
        throw new InvalidName()
      }
      return this;
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode)
    }
  }

  public checkVerified() {
    try {
      if (typeof(this.verified) !== "boolean") {
        throw new InvalidVerified()
      }
      return this;
    } catch (error:any) {
      throw new CustomError(error.message, error.statusCode)
    }
  }

}
