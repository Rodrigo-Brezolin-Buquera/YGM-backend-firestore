import { addOneWeek, adjustDate, getToday } from "./calendar.dates.service";
import { YogaClass } from "../domain/calendar.Entity";
import { ACTION, Day } from "../domain/calendar.Types";
import {
  CreateClassDTO,
  ClassIdDTO,
  DeleteClassesDTO,
  EditClassDTO,
  ClassQueryDTO,
  ChangeCapacityDTO,
} from "../domain/calendar.DTO";
import { CalendarRepository } from "./calendar.Repository";
import { CalendarMapper } from "../domain/calendar.Mapper";
import { InvalidAction } from "../../../common/customError/invalidRequests";

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
    YogaClass.verifyUserPermission(token);
    YogaClass.checkId(id);
    const result = await this.calendarInfrastructure.findClassById(id);
    return result;
  }

  public async createClass(input: CreateClassDTO): Promise<void> {
    let { date, quantity, capacity, token } = input;
    YogaClass.verifyAdminPermission(token);
    const groupId = YogaClass.generateId();

    if (!quantity) {
      quantity = 50;
    }

    if (!capacity) {
      capacity = 8;
    }

    const validationClass = CalendarMapper.toYogaClass({ ...input, groupId });

    validationClass.checkName().checkDay().checkTeacher().checkTime().checkCapacity();

    const fixedDate = adjustDate(date);
    YogaClass.isValidDate(fixedDate);

    let crescentDate = fixedDate;
    let list: YogaClass[] = [];

    for (let weeks: number = 0; weeks < quantity; weeks++) {
      const id = YogaClass.generateId();
      const yogaClass = CalendarMapper.toYogaClass({
        ...input,
        date: crescentDate,
        groupId,
        id,
      });
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
    const {changingDate, token } = input;
    YogaClass.verifyAdminPermission(token);
    const mockDay = Day.MON;
    const mockTime = "00:00";

    const editedClass =  CalendarMapper.toYogaClass({
      ...input,
      day: mockDay,
      time: mockTime
    })

    editedClass.checkName().checkTeacher().checkTime().checkCapacity();
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
    allClasses
      ? await this.calendarInfrastructure.deleteAllClasses(id)
      : await this.calendarInfrastructure.deleteClass(id);
  }

  public async changeCapacity(input: ChangeCapacityDTO): Promise<any> {
    const { id, action, token } = input;
    YogaClass.verifyUserPermission(token);
    YogaClass.checkId(id);
    let { capacity } = await this.findClassById({ id, token });

    if (action === ACTION.ADD) {
      capacity += 1;
    } else if (action === ACTION.SUBTRACT) {
      capacity -= 1;
    } else {
      throw new InvalidAction();
    }

    await this.calendarInfrastructure.changeCapacity(id, capacity);
  }
}
