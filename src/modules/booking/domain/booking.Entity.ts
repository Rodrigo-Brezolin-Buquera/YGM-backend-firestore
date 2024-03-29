import { validateDateFormat } from "../../../common/domain/common.pattern.date";
import { validateName } from "../../../common/domain/common.pattern.name";
import { validateTime } from "../../../common/domain/common.pattern.time";

export class Checkin {
  constructor(
    private id: string,
    private name: string,
    private date: string,
    private time: string,
    private plan: string,
    private yogaClassId: string,
    private contractId: string
  ) {
    validateName(this.name);
    validateDateFormat(this.date);
    validateTime(this.time);
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

  public getPlan(): string {
    return this.plan;
  }

  public getClassId(): string {
    return this.yogaClassId;
  }

  public getContractId(): string {
    return this.contractId;
  }

  public static toModel(obj: CheckinObject): Checkin {
    return new Checkin(
      obj.id,
      obj.name,
      obj.date,
      obj.time,
      obj.plan,
      obj.yogaClassId,
      obj.contractId
    );
  }
}

export interface CheckinObject {
  id: string,
  name: string,
  date: string,
  time: string,
  plan:string,
  yogaClassId: string,
  contractId: string
}