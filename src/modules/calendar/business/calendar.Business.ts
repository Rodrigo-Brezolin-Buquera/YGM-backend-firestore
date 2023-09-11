import { YogaClass } from "../domain/calendar.Entity";
import { CalendarRepository } from "./calendar.Repository";
import { IIdService } from "../../../common/services/common.ports";
import { getToday } from "./calendar.utils.getToday";
import { IdDTO } from "../../../common/domain/common.id.dto";
import { formatDate } from "../../../common/utils/common.utils.formatDate";
import { FindByPeriodDTO } from "../domain/DTOs/calendar.findByPeriod.dto";
import { CreateClassDTO } from "../domain/DTOs/calendar.createClass.dto";
import { DeleteClassDTO } from "../domain/DTOs/calendar.deleteClasses.dto";
import { addOneWeek } from "./calendar.utils.addOneWeek";

export class CalendarBusiness {
  constructor(
    private calendarDB: CalendarRepository,
    private idService: IIdService
  ) {}

  public async findClassesByPeriod({ dates}: FindByPeriodDTO): Promise<YogaClass[]> {
    const dateQuery = Array.isArray(dates) ? dates.map(i=>formatDate(i)) : [getToday()];
    return await this.calendarDB.findClassesByPeriod(dateQuery);
  }

  public async findClass({ id }: IdDTO): Promise<YogaClass> {
    return await this.calendarDB.findClass(id);
  }

  public async createClass(input: CreateClassDTO): Promise<void> {
    let { name, date, day, time, teacher, quantity, capacity } = input;
    const groupId = `${date}-${time}-${name}`

    let crescentDate = formatDate(date);
    quantity = quantity ?? 50
    capacity = capacity ?? 16

    let list: YogaClass[] = [];

    for (let weeks: number = 0; weeks < quantity; weeks++) {
      const id = this.idService.generateId();
      const yogaClass = YogaClass.toModel({
        id,
        day,
        time, 
        name, 
        teacher,
        quantity,
        capacity,
        groupId,
        date: crescentDate,
      });
      list = [...list, yogaClass]
      crescentDate = addOneWeek(crescentDate);
    }

    const promises = list.map(
      async (i) => await this.calendarDB.createClass(i)
    );

    await Promise.all(promises);
  }

  public async deleteClasses(input: DeleteClassDTO): Promise<void> {
    const { id, allClasses } = input;

    allClasses
      ? await this.calendarDB.deleteAllClasses(id)
      : await this.calendarDB.deleteClass(id);
  }
}
