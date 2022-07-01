import { CustomError } from "../../../common/customError/customError";
import { Checkin } from "../../booking/domain/booking.Entity";
import { addOneWeek, getToday } from "./calendar.dates.service";
import { YogaClass } from "../domain/calendar.Entity";
import { Day } from "../domain/calendar.Types";
import {
  CreateClassDTO,
  ClassIdDTO,
  DeleteClassesDTO,
  EditClassDTO,
  ClassQueryDTO,
} from "../domain/calendar.DTO";
import { CalendarRepository } from "./calendar.Repository";
import { CalendarMapper } from "../domain/calendar.Mapper";

export class CalendarApplication {
  constructor(private calendarInfrastructure: CalendarRepository) {}

  public async findAllClasses({today}: ClassQueryDTO): Promise<YogaClass[]> {
    try {
      let result = await this.calendarInfrastructure.findAllClasses();
     
      if(today){
        const todayDate = getToday()
        result = result.filter((yogaClass) => yogaClass.date === todayDate)
      } 
      return result;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async createClass(input: CreateClassDTO): Promise<void> {
    try {
      const { name, date, day, time, teacher, token } = input;
      console.log(date)
      YogaClass.verifyAdminPermission(token);

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
      for (let weeks: number = 0; weeks < 10; weeks++) {
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
        
        crescentDate = addOneWeek(crescentDate) ;

        await this.calendarInfrastructure.createClass(yogaClass);
      }
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async editClass(input: EditClassDTO): Promise<void> {
    const { name, time, teacher, groupId, changingDate, token } = input;
    YogaClass.verifyAdminPermission(token);
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

    const selectedClasses = yogaClassList.filter(
      (currentClass) =>
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

  public async deleteClass({ id, token }: ClassIdDTO): Promise<void> {
    try {
      YogaClass.verifyAdminPermission(token);

      await this.calendarInfrastructure.deleteClass(id);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteClasses(input: DeleteClassesDTO): Promise<void> {
    try {
      const { date, groupId, token } = input;
      YogaClass.verifyAdminPermission(token);
      const fixedDate = date.replace("-", "/").replace("-", "/");
      YogaClass.isValidDate(fixedDate);
      // precisa fazer um erro diferente! o formato da data no params não é o que o erro indica
      const yogaClassList = await this.calendarInfrastructure.findAllClasses();
      
      const selectedClasses = yogaClassList.filter(
        (currentClass) =>
          currentClass.groupId === groupId 
          &&
          YogaClass.compareDates(currentClass.date, fixedDate)
      );

      await this.calendarInfrastructure.deleteClasses(selectedClasses);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
