import { CustomError } from "../../../common/customError/customError";
import { generateId } from "../../../common/services/IdGenerator";
import {
  addOneWeek,
  compareDates,
  isValidDate,
} from "../../../common/services/moment";
import { Checkin } from "../../booking/domain/Domain";
import { YogaClass } from "../domain/Domain";
import {
  CreateClassDTO,
  Day,
  DeleteClassDTO,
  DeleteClassesDTO,
  EditClassDTO,
} from "../domain/Types";
import { CalendarRepository } from "./Repository";

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
      const groupId = generateId();
      const checkins: Checkin[] = [];

      const validationClass = new YogaClass(
        name,
        date,
        day,
        teacher,
        time,
        groupId
      );

      validationClass
        .checkName()
        .checkDate()
        .checkDay()
        .checkTeacher()
        .checkTime();

      let crescentDate = date;
      for (let i: number = 0; i < 50; i++) {
      
        const id = generateId();
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

    isValidDate(changingDate);

    editedClass.checkName().checkTeacher().checkTime().checkId(groupId);

    const yogaClassList = await this.calendarInfrastructure.findAllClasses();

    const selectedClasses = yogaClassList.filter((currentClass) => {
      return (
        currentClass.groupId === editedClass.groupId &&
        compareDates(currentClass.date, changingDate)
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

  public async deleteClass({ id }: DeleteClassDTO): Promise<void> {
    try {
      // verfiicação se id existe

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
      isValidDate(fixedDate);

      const yogaClassList = await this.calendarInfrastructure.findAllClasses();

      const selectedClasses = yogaClassList.filter((currentClass) => {
        return (
          currentClass.groupId === groupId &&
          compareDates(currentClass.date, date)
        );
      });

      await this.calendarInfrastructure.deleteClasses(selectedClasses);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
