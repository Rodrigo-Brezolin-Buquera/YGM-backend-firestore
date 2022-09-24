import { YogaClass } from "../domain/calendar.Entity";
import { ACTION } from "../domain/calendar.Types";
import {
  CreateClassDTO,
  ClassIdDTO,
  DeleteClassesDTO,
  EditClassDTO,
  ClassQueryDTO,
  ChangeCapacityDTO,
} from "../domain/calendar.DTO";
import { CalendarRepository } from "./calendar.Repository";
import { InvalidAction } from "../../../common/customError/invalidRequests";
import {
  IDateService,
  IIdService,
  ITokenService,
} from "../../../common/aplication/common.ports";

export class CalendarApplication {
  constructor(
    private calendarInfrastructure: CalendarRepository,
    private tokenService: ITokenService,
    private idService: IIdService,
    private dateService: IDateService
  ) {}

  public async findAllClasses({ today }: ClassQueryDTO): Promise<YogaClass[]> {
    return today
      ? await this.calendarInfrastructure.findClassesByDate(
          this.dateService.getToday()
        )
      : await this.calendarInfrastructure.findAllClasses();
  }

  public async findClassById({ id, token }: ClassIdDTO): Promise<YogaClass> {
    this.tokenService.verifyUserPermission(token);
    YogaClass.checkId(id);
    const result = await this.calendarInfrastructure.findClassById(id);
    return result;
  }

  public async createClass(input: CreateClassDTO): Promise<void> {
    let { date, quantity, capacity, token } = input;
    this.tokenService.verifyAdminPermission(token);
    const groupId = this.idService.generateId();

    if (!quantity || isNaN(capacity) || quantity <= 0) {
      quantity = 50;
    }

    if (isNaN(capacity) || !capacity || capacity <= 0) {
      capacity = 8;
    }

    const validationClass = YogaClass.toYogaClass({
      ...input,
      capacity,
      groupId,
    });

    validationClass
      .checkName()
      .checkDay()
      .checkTeacher()
      .checkTime()
      .checkCapacity();

    const fixedDate = this.dateService.adjustDate(date);
    YogaClass.checkDate(fixedDate);

    let crescentDate = fixedDate;
    let list: YogaClass[] = [];

    for (let weeks: number = 0; weeks < quantity; weeks++) {
      const id = this.idService.generateId();
      const yogaClass = YogaClass.toYogaClass({
        ...input,
        date: crescentDate,
        groupId,
        id,
      });
      crescentDate = this.dateService.addOneWeek(crescentDate);
      list.push(yogaClass);
    }

    const promises = list.map(
      async (yogaClass) =>
        await this.calendarInfrastructure.createClass(yogaClass)
    );

    await Promise.all(promises);
  }

  public async editClass(input: EditClassDTO): Promise<void> {
    const { changingDate, token } = input;
    this.tokenService.verifyAdminPermission(token);

    const editedClass = YogaClass.toEditedYogaClass({
      ...input,
      date: changingDate,
    });

    editedClass.checkName().checkTeacher().checkTime().checkCapacity();
    YogaClass.checkDate(changingDate);

    await this.calendarInfrastructure.editClass(editedClass);
  }

  public async deleteClasses(input: DeleteClassesDTO): Promise<void> {
    const { id, token, allClasses } = input;
    this.tokenService.verifyAdminPermission(token);
    allClasses
      ? await this.calendarInfrastructure.deleteAllClasses(id)
      : await this.calendarInfrastructure.deleteClass(id);
  }

  public async changeCapacity(input: ChangeCapacityDTO): Promise<any> {
    const { id, action, token } = input;
    this.tokenService.verifyUserPermission(token);
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
