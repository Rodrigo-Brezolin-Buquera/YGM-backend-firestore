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


      // fazer uma promise all!!! - separar em lógica a parte
      let crescentDate = date;
      for (let weeks: number = 0; weeks < 50; weeks++) {
        const id = YogaClass.generateId();
        const yogaClass = new YogaClass(  // essa lógica em no mapper??
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
    
    // seprar essa lógica em arquivo - o // essa lógica se repete!!!, levar o map para o mapper??
    const selectedClasses = yogaClassList.filter((currentClass) => {
      return (
        currentClass.groupId === editedClass.groupId &&
        YogaClass.compareDates(currentClass.date, changingDate)
      );
    });

    const newClasses = selectedClasses.map(
      (currentClass) =>
        new YogaClass(
          editedClass.name,
          currentClass.date,
          currentClass.day,
          editedClass.teacher,
          editedClass.time,
          editedClass.groupId,
          currentClass.checkins,
          currentClass.id
        )
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

      // essa lógica se repete!!!
      const selectedClasses = yogaClassList.filter((currentClass) => {
        return (
          currentClass.groupId === groupId &&
          YogaClass.compareDates(currentClass.date, date)
        );
      });

      await this.calendarInfrastructure.deleteClasses(selectedClasses);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
