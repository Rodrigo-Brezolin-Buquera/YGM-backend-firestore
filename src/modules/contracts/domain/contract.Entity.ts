import { CustomError } from "../../../common/customError/customError";
import { Plan } from "../../../common/domain/common.enum";
import { validateDateFormat } from "../../../common/domain/common.pattern.date";
import { validateName } from "../../../common/domain/common.pattern.name";


export class Contract {
  constructor(
    private id: string,
    private name: string,
    private plan: Plan,
    private started: string,
    private ends: string | null,
    private availableClasses: number | null
  ) {
    validateName(this.name);
    this.checkPlan();
    this.checkDates();
  }

  public getId(): string {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getPlan(): Plan {
    return this.plan;
  }
  public getStarted(): string {
    return this.started;
  }
  public getEnds(): string | null {
    return this.ends;
  }
  public getAvailableClasses(): number | null {
    return this.availableClasses;
  }

  public setPlan(plan: Plan) {
    this.plan = plan;
    this.checkPlan();
  }

  public setStarted(date: string) {
    this.started = date;
    validateDateFormat(this.started);
  }

  public setEnds(value: string | null) {
    this.ends = value;
    if (this.ends) {
      validateDateFormat(this.ends);
    }
  }

  public setClasses(value: number | null) {
    this.availableClasses = value;
  }

  private checkPlan() {
    if (!Object.values(Plan).includes(this.plan)) {
      throw new CustomError("Plano inválido", 400);
    }
  }
  private checkDates() {
    validateDateFormat(this.started);
    if (this.ends) {
      validateDateFormat(this.ends);
    }
  }

  public static toModel(obj: ContractObject): Contract {
    const result = new Contract(
      obj.id,
      obj.name,
      obj.plan,
      obj.started,
      obj.ends,
      obj.availableClasses
    );
    return result;
  }
}

export interface ContractObject {
  id: string,
  name: string,
  plan: Plan,
  started: string,
  ends: string | null
  availableClasses: number | null
}