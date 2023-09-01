import { validateDateFormat, validateName, validateTime } from "../../../common/domain/common.patterns";

export class Checkin {
  constructor(
    private id: string,
    private name: string,
    private date: string,
    private time: string,
    private yogaClassId: string,
    private contractId: string
  ) {
    this.checkName();
    this.checkDate()
    this.checkTime()
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDate(): string {
    return this.date;
  }

  public getTime(): string {
    return this.time;
  }

  public getClassId(): string {
    return this.yogaClassId;
  }

  public getContractId(): string {
    return this.contractId;
  }

  private checkName() {
    validateName(this.name);
  }

  private checkDate() {
    validateDateFormat(this.date);
  }

  private checkTime() {
    validateTime(this.time);
  }

  public static toModel(obj: any): Checkin {
    return new Checkin(
      obj.id,
      obj.name,
      obj.date,
      obj.time,
      obj.yogaClassId,
      obj.contractId,
    );
  }
}
