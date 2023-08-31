import { validateName } from "../../../common/domain/common.patterns";

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

  private checkName() {
    validateName(this.name);
  }

  public static toCheckin(obj: any): Checkin {
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
