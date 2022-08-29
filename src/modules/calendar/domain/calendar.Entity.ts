import {
  InvalidCapacity,
  InvalidDay,
  InvalidTeacher,
  InvalidTime,
  InvalidYogaType,
} from "../../../common/customError/invalidRequests";
import { CommonDomain } from "../../../common/domain/CommonDomain";
import { ClassName, Day, Teacher } from "./calendar.Types";

export class YogaClass extends CommonDomain {
  constructor(
    public readonly name: string,
    public readonly date: string,
    public readonly day: string,
    public readonly teacher: string,
    public readonly time: string,
    public readonly capacity: number,
    public readonly groupId: string,
    public readonly id?: string
  ) {
    super();
  }

  public checkName() {
    if (
      this.name !== ClassName.HATHA &&
      this.name !== ClassName.VINYASA &&
      this.name !== ClassName.RESTAURATIVE
    ) {
      throw new InvalidYogaType();
    }
    return this;
  }

  public checkDay() {
    if (
      this.day !== Day.MON &&
      this.day !== Day.TUE &&
      this.day !== Day.WED &&
      this.day !== Day.THU &&
      this.day !== Day.FRI &&
      this.day !== Day.SAT
    ) {
      throw new InvalidDay();
    }
    return this;
  }

  public checkTime() {
    if (!this.time) {
      throw new InvalidTime();
    }
    if (this.time.indexOf(":") === -1 || this.time.length !== 5) {
      throw new InvalidTime();
    }
    return this;
  }

  public checkTeacher() {
    if (this.teacher !== Teacher.LOUIZE && this.teacher !== Teacher.RODRIGO) {
      throw new InvalidTeacher();
    }
    return this;
  }

  public checkCapacity() {
    if (isNaN(this.capacity)) {
      throw new InvalidCapacity()
    }

    if (!this.capacity) {
      throw new InvalidCapacity()
    }
    
    if (this.capacity < 0) {
      throw new InvalidCapacity()
    }
    return this;
  }
}
