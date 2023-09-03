import { CustomError } from "../../../common/customError/customError";
import { Day, StyleName } from "../../../common/domain/common.enum";
import { validateTime } from "../../../common/domain/common.patterns.time";

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
    validateTime(this.time)
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
      throw new CustomError( "A aula precisa ser: Hatha Yoga, Vinyasa Flow ou Yoga Restaurativo", 400)
    }
  }

  private checkDay() {
    if (!Object.values(Day).includes(this.day)) {
      throw new CustomError("Dia de aula inválido", 400)
    }
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
