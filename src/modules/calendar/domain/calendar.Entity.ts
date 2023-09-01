import {
  InvalidDay,
  InvalidYogaType,
} from "../../../common/customError/invalidRequests";
import { Day, StyleName } from "../../../common/domain/common.enum";
import { validateTime } from "../../../common/domain/common.patterns";

export class YogaClass  {
  constructor(
    private id: string,
    private groupId: string,
    private name: StyleName,
    private date: string,
    private day: Day,
    private teacher: string,
    private time: string,
    private capacity: number,
  ) {
    this.checkName()
    this.checkDay()
    this.checkTime()
  }
  public getId(): string {
    return this.id;
  }

  public getGroupId(): string {
    return this.groupId;
  }

  public getName(): string {
    return this.name;
  }

  public getDate(): string {
    return this.date;
  }

  public getDay(): string {
    return this.day;
  }

  public getTeacher(): string {
    return this.teacher;
  }

  public getTime(): string {
    return this.time;
  }

  public getCapacity(): number {
    return this.capacity;
  }

  private checkName() {
    if (!Object.values(StyleName).includes(this.name)) {
      throw new InvalidYogaType()
    }
  }

  private checkDay() {
    if (!Object.values(Day).includes(this.day)) {
      throw new InvalidDay()
    }
  }

  private checkTime() {
    validateTime(this.time)
   }

  public static toModel(obj: any): YogaClass {
    return new YogaClass(
      obj.id,
      obj.groupId,
      obj.name,
      obj.date,
      obj.day,
      obj.teacher,
      obj.time,
      obj.capacity,
    );
  }

 
}
