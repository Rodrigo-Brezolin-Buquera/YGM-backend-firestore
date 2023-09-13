import { Day, stringToDay } from "../../../common/domain/common.enum.Day";
import { stringToStyleName, StyleName } from "../../../common/domain/common.enum.StyleName";
import { validateTime } from "../../../common/domain/common.pattern.time";

export class YogaClass {
  constructor(
    private id: string,
    private groupId: string,
    private name: StyleName,
    private date: string,
    private day: Day,
    private teacher: string,
    private time: string,
    private capacity: number
  ) {
    validateTime(this.time);
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

  public static toModel(obj: YogaClassObject): YogaClass {
    const day = stringToDay(obj.day)
    const name = stringToStyleName(obj.name)
    return new YogaClass(
      obj.id,
      obj.groupId,
      name,
      obj.date,
      day,
      obj.teacher,
      obj.time,
      obj.capacity
    );
  }
}

export interface YogaClassObject {
  id: string;
  groupId: string;
  name: string;
  date: string;
  day: string;
  teacher: string;
  time: string;
  capacity: number;
}
