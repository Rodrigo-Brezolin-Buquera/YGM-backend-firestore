import { CustomError } from "../../../common/customError/customError";
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
  }

  private checkType() {
    if (!Object.values(Type).includes(this.type)) {
      throw new CustomError("O tipo do plano precisa ser: Mensal, Trimestral, Semestral, Avulsa, Gympass ou Totalpass",  400);
    }
  }

  private checkFrequency() {
    if (!Object.values(Frequency).includes(this.frequency)) {
      throw new CustomError("A frequências das aulas precisa ser: 1x, 2x, 3x ou ---",400);
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
  constructor(private id: string, private type: Type) {
    
  }

  public getId(): string {
    return this.id;
  }
}
