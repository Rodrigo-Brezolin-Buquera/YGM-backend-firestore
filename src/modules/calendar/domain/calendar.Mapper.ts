import { ClassIdDTO, CreateClassDTO, DeleteClassesDTO, EditClassDTO } from "./calendar.DTO";
import { YogaClass } from "./calendar.Entity";

export class CalendarMapper {

  public static toModelYogaClass(obj: any): YogaClass {
    const result = new YogaClass(
      obj.name,
      obj.date,
      obj.day,
      obj.teacher,
      obj.time,
      obj.groupId,
      obj.checkins,
      obj.id
    );
    return result;
  }

  public static toModelFireStoreYogaClass(obj: YogaClass): any {
   return {
      name:obj.name,
      date: obj.date,
      day: obj.day,
      teacher: obj.teacher,
      time: obj.time,
      groupId: obj.groupId,
      checkins: obj.checkins,
      id: obj.id
   }
  }

  public static toModelCreateClassDTO(obj: any): CreateClassDTO {
    return {
        name: obj.name,
        date: obj.date,
        day: obj.day,
        time: obj.time,
        teacher: obj.teacher
    }
   }

   public static toModelEditClassDTO(obj: any): EditClassDTO {
    return {
        name: obj.body.name,
        time: obj.body.time,
        teacher: obj.body.teacher,
        changingDate: obj.body.changingDate,
        groupId: obj.params.groupId
    }
   }

   public static toModelClassIdDTO(req: any): ClassIdDTO {
    return { id: req.params.id }
   }

   public static toModelDeleteClassesDTO(req: any): DeleteClassesDTO {
    return {
        date: req.params.date,
        groupId: req.params.groupId
    }
   }

}