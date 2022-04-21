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

  public static toModelCreateClassDTO(req: any): CreateClassDTO {
    return {
        name: req.body.name,
        date: req.body.date,
        day: req.body.day,
        time: req.body.time,
        teacher: req.body.teacher
    }
   }

   public static toModelEditClassDTO(req: any): EditClassDTO {
    return {
        name: req.body.name,
        time: req.body.time,
        teacher: req.body.teacher,
        changingDate: req.body.changingDate,
        groupId: req.params.groupId
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