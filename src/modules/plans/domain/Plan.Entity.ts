import {
  InvalidFrequency,
  InvalidPayment,
  InvalidPlanType,
} from "../../../common/customError/invalidRequests";
import { Frequency, Type } from "../../../common/domain/common.enum";

export class Plan {
  constructor(
    private id: string,
    private type: Type,
    private frequency: Frequency,
    private availableClasses: number,
    private durationInMonths: number,
    private monthlyPayment: string
  ) {
    this.checkFrequency();
    this.checkPayment();
    this.checkType();
  }

  public getId(): string {
    return this.id;
  }

  public getType(): Type {
    return this.type;
  }

  public getFrequency(): Frequency {
    return this.frequency;
  }

  public getAvailableClasses(): number {
    return this.availableClasses;
  }

  public getDurationInMonths(): number {
    return this.durationInMonths;
  }

  public getMonthlyPayment(): string {
    return this.monthlyPayment;
  }

  public setMonthlyPayment(value: string) {
     this.monthlyPayment = value
     this.checkPayment()
  }

  private checkType() {
    if (!Object.values(Type).includes(this.type)) {
      throw new InvalidPlanType();
    }
  }

  private checkFrequency() {
    if (!Object.values(Frequency).includes(this.frequency)) {
      throw new InvalidFrequency();
    }
  }

  private checkPayment() {
    if (
      !this.monthlyPayment.includes("R$") &&
      !this.monthlyPayment.includes(",")
    ) {
      throw new InvalidPayment();
    }
  }
  public static toModel(obj: any): Plan {
    return new Plan(
      obj.id,
      obj.type,
      obj.frequency,
      obj.availableClasses,
      obj.durationInMonths,
      obj.monthlyPayment
    );
  }
}

export class SimplePlan {
  constructor(private id: string, private type: Type) {}
}
