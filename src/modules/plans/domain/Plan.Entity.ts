import { CustomError } from "../../../common/customError/customError";
import { Frequency, stringToFrequency } from "../../../common/domain/common.enum.Frequency";
import { stringToType, Type } from "../../../common/domain/common.enum.Type";

export class Plan {
  constructor(
    private id: string,
    private type: Type,
    private frequency: Frequency,
    private monthlyPayment: string
  ) { }

  public getId(): string {
    return this.id;
  }

  public getType(): Type {
    return this.type;
  }

  public getFrequency(): Frequency {
    return this.frequency;
  }

  public getMonthlyPayment(): string {
    return this.monthlyPayment;
  }

  public setMonthlyPayment(value: string) {
    this.monthlyPayment = value;
  }

  public static toModel(obj: PlanObject): Plan {
    const frequency = stringToFrequency(obj.frequency)
    const type = stringToType(obj.type)
    return new Plan(
      obj.id,
      type,
      frequency,
      obj.monthlyPayment
    );
  }
}

export interface PlanObject {
  id: string;
  type: string;
  frequency: string;
  monthlyPayment: string;
}

export class SimplePlan {
  constructor(private id: string, private type: string) {}

  public getId(): string {
    return this.id;
  }

  public getType(): string {
    return this.type;
  }
}
