import { CustomError } from "../../../common/customError/customError";
import { Frequency, stringToFrequency } from "../../../common/domain/common.enum.Frequency";
import { stringToType, Type } from "../../../common/domain/common.enum.Type";

export class Plan {
  constructor(
    private id: string,
    private type: Type,
    private frequency: Frequency,
    private price: string
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

  public getPrice(): string {
    return this.price;
  }

  public setPrice(value: string) {
    this.price = value;
  }

  public static toModel(obj: PlanObject): Plan {
    const frequency = stringToFrequency(obj.frequency)
    const type = stringToType(obj.type)
    return new Plan(
      obj.id,
      type,
      frequency,
      obj.price
    );
  }
}

export interface PlanObject {
  id: string;
  type: string;
  frequency: string;
  price: string;
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
