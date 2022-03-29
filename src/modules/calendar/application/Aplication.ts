import { CustomError } from "../../../common/customError/customError";
import { generateId } from "../../../common/services/IdGenerator";
import { addOneWeek } from "../../../common/services/moment";
import { YogaClass } from "../domain/Domain";
import { CalendarCheckin, createClassDTO } from "../domain/Types";
import { CalendarRepository } from "./Repository";

export class CalendarApplication {
  constructor(private calendarInfrastructure: CalendarRepository) {}

  public async findAllClasses(): Promise<YogaClass[]> {
    try {
      const result = this.calendarInfrastructure.findAllClasses();

      return result;
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async createClass(input: createClassDTO): Promise<void> {
    try {
      const { name, date, day, time, teacher } = input;
      const groupId = generateId();
      const checkins: CalendarCheckin[] = [];

      const validationClass = new YogaClass(
        name,
        date,
        day,
        teacher,
        time,
        checkins,
        groupId
      );

      validationClass
        .checkName(name)
        .checkDate(date)
        .checkDay(day)
        .checkTeacher(teacher)
        .checkTime(time)
        .checkCheckins(checkins);

      let crescentDate = date;
      for (let i: number = 0; i < 2; i++) {  // só 2 pra não cagar no banco, dps alterar para 50
        const id = generateId();
        const yogaClass = new YogaClass(
          name,
          crescentDate,
          day,
          teacher,
          time,
          checkins,
          groupId,
          id
        );
        crescentDate = addOneWeek(crescentDate);

        await this.calendarInfrastructure.createClass(yogaClass);
      }
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async editClass(): Promise<void> {
    try {
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }

  public async deleteClass(): Promise<void> {
    try {
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
}
