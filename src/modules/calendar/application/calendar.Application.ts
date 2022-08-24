import { addOneWeek, adjustDate, getToday } from "./calendar.dates.service";
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
import { Checkin } from "../domain/calendar.Types";

export class CalendarApplication {
  constructor(private calendarInfrastructure: CalendarRepository) {}

  public async findAllClasses({ today }: ClassQueryDTO): Promise<YogaClass[]> {
    let result = await this.calendarInfrastructure.findAllClasses();

    if (today) {
      const todayDate = getToday();
      result = result.filter((yogaClass) => yogaClass.date === todayDate);
    }
    return result;
  }

  public async findClassById({ id, token }: ClassIdDTO): Promise<YogaClass> {
    YogaClass.verifyAdminPermission(token);
    YogaClass.checkId(id);
    const result = await this.calendarInfrastructure.findClassById(id.trim());
    return result;
  }

  public async createClass(input: CreateClassDTO): Promise<void> {
    const { name, date, day, time, teacher, token } = input;
    YogaClass.verifyAdminPermission(token);
    YogaClass.checkEmptyInput(input);
    const groupId = YogaClass.generateId();
    const checkins: Checkin[] = [];

    const validationClass = new YogaClass(
      name.trim(),
      date.trim(),
      day.trim(),
      teacher.trim(),
      time.trim(),
      groupId
    );

    validationClass.checkName().checkDay().checkTeacher().checkTime();

    const fixedDate = adjustDate(date);
    YogaClass.isValidDate(fixedDate);

    let crescentDate = fixedDate;
    let list: YogaClass[] = [];
    for (let weeks: number = 0; weeks < 50; weeks++) {
      // 50 é a quantidade de aulas a ser criada, futuramente virá por query
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
      list.push(yogaClass);
    }

    const promises = list.map(
      async (yogaClass) =>
        await this.calendarInfrastructure.createClass(yogaClass)
    );

    await Promise.all(promises);
  }

  public async editClass(input: EditClassDTO): Promise<void> {
    const { name, time, teacher, groupId, changingDate, token } = input;
    YogaClass.verifyAdminPermission(token);
    YogaClass.checkEmptyInput(input);
    const mockDay = Day.MON;
    const mockTime = "00:00";

    const editedClass = new YogaClass(
      name.trim(),
      mockDay,
      mockTime,
      teacher.trim(),
      time.trim(),
      groupId.trim()
    );

    editedClass.checkName().checkTeacher().checkTime();
    YogaClass.isValidDate(changingDate);

    const yogaClassList = await this.calendarInfrastructure.findAllClasses();

    const selectedClasses = yogaClassList.filter(
      (currentClass) =>
        currentClass.groupId === editedClass.groupId &&
        YogaClass.compareDates(changingDate, currentClass.date)
    );

    const newClasses = selectedClasses.map((currentClass) =>
      CalendarMapper.toEditedYogaClass(currentClass, editedClass)
    );

    await this.calendarInfrastructure.editClass(newClasses);
  }

  public async deleteClasses(input: DeleteClassesDTO): Promise<void> {
    const { id, token, allClasses } = input;
    YogaClass.verifyAdminPermission(token);
    YogaClass.checkEmptyInput(input);
    allClasses
      ? await this.calendarInfrastructure.deleteAllClasses(id.trim())
      : await this.calendarInfrastructure.deleteClass(id.trim());
  }
}
