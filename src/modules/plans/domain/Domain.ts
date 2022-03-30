import {
  CustomError} from "../../../common/customError/customError";
import { FREQUENCY, TYPE } from "./Types";

export class Plan {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly frequency: string,
    public readonly availableClasses: number,
    public readonly durationInMonths: number
  ) {}

  public checkType() {
    if (!this.type) {
      throw CustomError.invalidRequest()
    }
    if (
      this.type !== TYPE.MONTHLY &&
      this.type !== TYPE.QUARTERLY &&
      this.type !== TYPE.SEMIANNUAL &&
      this.type !== TYPE.SINGLE &&
      this.type !== TYPE.APP
    ) {
      throw CustomError.invalidClassType();
    }
    return this;
  }

  public checkFrequency() {
    if (!this.frequency) {
      throw CustomError.invalidRequest()
    }
    if (
      this.frequency !== FREQUENCY.ONE &&
      this.frequency !== FREQUENCY.TWO &&
      this.frequency !== FREQUENCY.THREE &&
      this.frequency !== FREQUENCY.NONE
    ) {
      throw CustomError.invalidFrequency();
    }
    return this;
  }

  public checkDuration() {
    if (!this.durationInMonths || this.durationInMonths < 0) {
      throw CustomError.invalidDuration();
    }
    return this;
  }

  public checkClasses() {
    if (!this.availableClasses || this.availableClasses <= 0) {
      throw CustomError.invalidClassQuantity()
    }
    return this;
  }
}
