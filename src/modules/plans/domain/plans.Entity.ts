import {
  InvalidClassQuantity,
  InvalidDuration,
  InvalidFrequency,
  InvalidPayment,
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
    public readonly durationInMonths: number,
    public readonly monthlyPayment: string
  ) {
    super();
  }

  public checkType() {
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
  }

  public checkFrequency() {
    if (
      this.frequency !== FREQUENCY.ONE &&
      this.frequency !== FREQUENCY.TWO &&
      this.frequency !== FREQUENCY.THREE &&
      this.frequency !== FREQUENCY.NONE
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

  public checkPayment() {
    if (!this.monthlyPayment) {
      throw new InvalidPayment();
    }
 
    if (!this.monthlyPayment.includes("R$")) {
      throw new InvalidPayment();
    }
  
    if (!this.monthlyPayment.includes(",")) {
      throw new InvalidPayment();
    }

    if (this.monthlyPayment.length < 8 || this.monthlyPayment.length > 10) {
      throw new InvalidPayment();
    }

    return this;
  }

  public static toPlan(obj: any): Plan {
    const result = new Plan(
      obj.id,
      obj.type,
      obj.frequency,
      obj.availableClasses,
      obj.durationInMonths,
      obj.monthlyPayment
    );
    return result;
  }
}
