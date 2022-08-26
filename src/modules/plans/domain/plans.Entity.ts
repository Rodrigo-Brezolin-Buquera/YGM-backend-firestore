import {
  InvalidClassQuantity,
  InvalidDuration,
  InvalidFrequency,
  InvalidPlanType,
} from "../../../common/customError/invalidRequests";
import { CommonDomain } from "../../../common/domain/CommonDomain";
import { FREQUENCY, TYPE } from "./plans.Types";

export class Plan extends CommonDomain {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly frequency: string,
    public readonly availableClasses: number,
    public readonly durationInMonths: number
  ) {
    super();
  }

  public checkType() {
    if (
      this.type !== TYPE.MONTHLY &&
      TYPE.QUARTERLY &&
      TYPE.SEMIANNUAL &&
      TYPE.SINGLE &&
      TYPE.APP
    ) {
      throw new InvalidPlanType();
    }
    return this;
  }

  public checkFrequency() {
    if (
      this.frequency !== FREQUENCY.ONE &&
      FREQUENCY.TWO &&
      FREQUENCY.THREE &&
      FREQUENCY.NONE
    ) {
      throw new InvalidFrequency();
    }
    return this;
  }

  public checkDuration() {
    if (isNaN(this.durationInMonths)) {
      throw new InvalidDuration();
    }

    if (this.durationInMonths < 0) {
      throw new InvalidDuration();
    }
    return this;
  }

  public checkClasses() {
    if (isNaN(this.availableClasses)) {
      throw new InvalidClassQuantity();
    }

    if (this.availableClasses < 0) {
      throw new InvalidClassQuantity();
    }
    return this;
  }
}
