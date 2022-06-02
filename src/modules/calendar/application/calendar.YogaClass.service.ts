import { CustomError } from "../../../common/customError/customError";
import { Checkin } from "../../booking/domain/booking.Entity";
import { addOneWeek } from "./calendar.dates.service";
import { YogaClass } from "../domain/calendar.Entity";
import { Day } from "../domain/calendar.Types";
import {
  CreateClassDTO,
  ClassIdDTO,
  DeleteClassesDTO,
  EditClassDTO,
} from "../domain/calendar.DTO";
import { CalendarRepository } from "./calendar.Repository";
import { CalendarMapper } from "../domain/calendar.Mapper";

export class CalendarApplication {
  constructor(private calendarInfrastructure: CalendarRepository) {}

  public async findAllClasses(): Promise<YogaClass[]> {
    try {
      const result = this.calendarInfrastructure.findAllClasses();

      return result;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async createClass(input: CreateClassDTO): Promise<void> {
    try {
      const { name, date, day, time, teacher } = input;
      const groupId = YogaClass.generateId();
      const checkins: Checkin[] = [];

      const validationClass = new YogaClass(
        name,
        date,
        day,
        teacher,
        time,
        groupId
      );

      validationClass.checkName().checkDay().checkTeacher().checkTime();

      YogaClass.isValidDate(date);

      // melhorar! - separar em lógica a parte?
      let crescentDate = date;
      for (let weeks: number = 0; weeks < 50; weeks++) {
        const id = YogaClass.generateId();
        const yogaClass = new YogaClass(
          name,
          crescentDate,
          day,
          teacher,
          time,
          groupId,
          checkins,
          id
        );
        crescentDate = addOneWeek(crescentDate);

        await this.calendarInfrastructure.createClass(yogaClass);
      }
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async editClass(input: EditClassDTO): Promise<void> {
    const { name, time, teacher, groupId, changingDate } = input;
    const mockDay = Day.MON;
    const mockTime = "00:00";

    const editedClass = new YogaClass(
      name,
      mockDay,
      mockTime,
      teacher,
      time,
      groupId
    );

    editedClass.checkName().checkTeacher().checkTime().checkId(groupId);

    YogaClass.isValidDate(changingDate);

    const yogaClassList = await this.calendarInfrastructure.findAllClasses();

    const selectedClasses = yogaClassList.filter((currentClass) =>
        currentClass.groupId === editedClass.groupId &&
        YogaClass.compareDates(currentClass.date, changingDate)
    );

    const newClasses = selectedClasses.map((currentClass) =>
      CalendarMapper.toEditedYogaClass(currentClass, editedClass)
    );

    await this.calendarInfrastructure.editClass(newClasses);

    try {
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteClass({ id }: ClassIdDTO): Promise<void> {
    try {
      await this.calendarInfrastructure.deleteClass(id);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteClasses({
    date,
    groupId,
  }: DeleteClassesDTO): Promise<void> {
    try {
      const fixedDate = date.replace("-", "/").replace("-", "/");
      YogaClass.isValidDate(fixedDate);

      const yogaClassList = await this.calendarInfrastructure.findAllClasses();

      const selectedClasses = yogaClassList.filter((currentClass) => {
        currentClass.groupId === groupId &&
        YogaClass.compareDates(currentClass.date, date);
      });

      await this.calendarInfrastructure.deleteClasses(selectedClasses);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
