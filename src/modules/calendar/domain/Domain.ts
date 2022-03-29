import { CustomError } from "../../../common/customError/customError";
import { isValidDate } from "../../../common/services/moment";
import { CalendarCheckin, ClassName, Day, Teacher } from "./Types";

export class YogaClass {
  constructor(
    public readonly name: string,
    public readonly date: string,
    public readonly day: string,
    public readonly teacher: string,
    public readonly time: string,
    public readonly groupId: string,
    public readonly checkins?: CalendarCheckin[],
    public readonly id?: string
  ) {}

  public checkName(name: string) {
    if (!name) {
      throw CustomError.invalidRequest();
    }

    if (
      name !== ClassName.HATHA &&
      name !== ClassName.VINYASA &&
      name !== ClassName.RESTAURATIVE
    ) {
      throw CustomError.invalidRequest();
    }
    return this;
  }

  public checkDay(day: string) {
    if (!day) {
      throw CustomError.invalidRequest();
    }
    if (
      day !== Day.MON &&
      day !== Day.TUE &&
      day !== Day.WED &&
      day !== Day.THU &&
      day !== Day.FRI &&
      day !== Day.SAT
    ) {
      throw CustomError.invalidDay();
    }
    return this;
  }

  public checkTime(time: string) {
    if (!time) {
      throw CustomError.invalidRequest();
    }
    if (time.indexOf(":") === -1 || time.length !== 5) {
      throw CustomError.invalidTime();
    }
    return this;
  }

  public checkTeacher(teacher: string) {
    if (!teacher) {
      throw new CustomError.invalidRequest();
    }
    if (teacher !== Teacher.LOUIZE && teacher !== Teacher.RODRIGO) {
      throw new CustomError.invalidTeacher();
    }
    return this;
  }

  public checkCheckins(checkins: CalendarCheckin[]) {
    // definir melhor
  }

  public checkDate(date: string) {
    isValidDate(date);
    return this
  }

  public checkId(id: string) {
    if (!id) {
      throw CustomError.invalidRequest();
    }
    return this;
  }
}
