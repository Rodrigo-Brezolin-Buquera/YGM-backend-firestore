import {
  InvalidName,
  InvalidVerified,
} from "../../../common/customError/invalidRequests";
import { CommonDomain } from "../../../common/domain/CommonDomain";

export class Checkin extends CommonDomain {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly date: string,
    public readonly yogaClassId: string,
    public readonly contractId: string,
    public readonly verified: boolean 
  ) {
    super();
  }

  public checkName() {
    if (!this.name) {
      throw new InvalidName();
    }
    if (this.name.length < 5) {
      throw new InvalidName();
    }
    return this;
  }

  public checkVerified() {
      console.log(this.verified)
    console.log(typeof this.verified != "boolean")
    if (typeof this.verified != "boolean") {
      throw new InvalidVerified();
    }
    return this;
  }
}
