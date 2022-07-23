import { CustomError } from "../../../common/customError/customError";
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
    try {
      if (
        this.type !== TYPE.MONTHLY &&
        this.type !== TYPE.QUARTERLY &&
        this.type !== TYPE.SEMIANNUAL &&
        this.type !== TYPE.SINGLE &&
        this.type !== TYPE.APP
      ) {
        throw new InvalidPlanType();
      }
      return this;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode);
    }
  }

  public checkFrequency() {
    try {
      if (
        this.frequency !== FREQUENCY.ONE &&
        this.frequency !== FREQUENCY.TWO &&
        this.frequency !== FREQUENCY.THREE &&
        this.frequency !== FREQUENCY.NONE
      ) {
        throw new InvalidFrequency();
      }
      return this;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode);
    }
  }

  public checkDuration() {
    try {
      if (isNaN(this.durationInMonths)) {
        throw new InvalidDuration();
      }

      if (this.durationInMonths < 0) {
        throw new InvalidDuration();
      }
      return this;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode);
    }
  }

  public checkClasses() {
    try {
      if (isNaN(this.availableClasses)) {
        throw new InvalidClassQuantity();
      }

      if (this.availableClasses < 0) {
        throw new InvalidClassQuantity();
      }
      return this;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode);
    }
  }
}
