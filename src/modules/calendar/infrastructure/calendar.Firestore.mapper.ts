import { YogaClass } from "../domain/calendar.Entity";

export class CalendarFirestoreMapper {
  public static toFireStoreYogaClass(obj: YogaClass): any {
    return {
      name: obj.name,
      date: obj.date,
      day: obj.day,
      teacher: obj.teacher,
      time: obj.time,
      capacity: obj.capacity,
      groupId: obj.groupId,
      id: obj.id,
    };
  }
  public static toFireStoreEditedYogaClass(obj: YogaClass): any {
    return {
      name: obj.name,
      teacher: obj.teacher,
      time: obj.time,
      capacity: obj.capacity,
    };
  }
}
