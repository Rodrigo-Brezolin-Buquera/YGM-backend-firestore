import { CalendarRepository } from "../business/calendar.Repository";
import { BaseDatabase } from "../../../common/database/BaseDatabase";
import { YogaClass } from "../domain/calendar.Entity";
import { NotFound } from "../../../common/customError/notFound";

export class CalendarDatabase extends BaseDatabase
  implements CalendarRepository
{
  collectionName = "calendar";

  public async findClassesByPeriod(dates: string[]): Promise<YogaClass[]> {
    const snap = await this.collection().where("date", "in", dates).get();
    const yogaClasses = snap.docs.map((doc) => doc.data());
    return yogaClasses.map((i) => YogaClass.toModel(i));
  }

  public async findClass(id: string): Promise<YogaClass> {
    const yogaClass = await super.findById(id);
    if (!yogaClass) {
      throw new NotFound("aula");
    }
    return YogaClass.toModel(yogaClass);
  }

  public async createClass(yogaClass: YogaClass): Promise<void> {
    await super.create(yogaClass, this.toFireStoreYogaClass);
  }

  public async deleteAllClasses(groupId: string): Promise<void> {
    await this.collection()
      .where("groupId", "==", groupId)
      .get()
      .then((snap) => {
        snap.forEach((doc) => doc.ref.delete());
      });
  }

  public async deleteClass(id: string): Promise<void> {
    await super.delete(id)
  }

  private toFireStoreYogaClass(obj: YogaClass): Object {
    return {
      id: obj.getId(),
      groupId: obj.getGroupId(),
      name: obj.getName(),
      date: obj.getDate(),
      day: obj.getDay(),
      teacher: obj.getTeacher(),
      time: obj.getTime(),
      capacity: obj.getCapacity(),
    };
  }

}
