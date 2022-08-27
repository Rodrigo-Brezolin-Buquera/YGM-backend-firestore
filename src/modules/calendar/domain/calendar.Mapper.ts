import {
  ClassIdDTO,
  CreateClassDTO,
  DeleteClassesDTO,
  EditClassDTO,
  ClassQueryDTO,
  ChangeCapacityDTO
} from "./calendar.DTO";
import { YogaClass } from "./calendar.Entity";

export class CalendarMapper {
  public static toYogaClass(obj: any): YogaClass {
    const result = new YogaClass(
      obj.name,
      obj.date,
      obj.day,
      obj.teacher,
      obj.time,
      obj.groupId,
      obj.id
    );
    return result;
  }

  public static toEditedYogaClass(
    currentClass: YogaClass,
    editedClass: YogaClass
  ): YogaClass {
    const result = new YogaClass(
      editedClass.name,
      currentClass.date,
      currentClass.day,
      editedClass.teacher,
      editedClass.time,
      editedClass.capacity,
      editedClass.groupId,
      currentClass.id
    );
    return result;
  }

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
      capacity: obj.capacity
    };
  }

  public static toCreateClassDTO(req: any): CreateClassDTO {
    return {
      name: req.body.name.trim(),
      date: req.body.date.trim(),
      day: req.body.day.trim(),
      time: req.body.time.trim(),
      teacher: req.body.teacher.trim(),
      quantity: Number(req.query.quantity),
      capacity: Number(req.body.capacity),
      token: req.headers.authorization!.trim(),
    };
  }

  public static toEditClassDTO(req: any): EditClassDTO {
    return {
      name: req.body.name.trim(),
      time: req.body.time.trim(),
      teacher: req.body.teacher.trim(),
      changingDate: req.body.changingDate.trim(),
      capacity: Number(req.body.capacity),
      groupId: req.params.groupId.trim(),
      token: req.headers.authorization!.trim(),
    };
  }

  public static toClassIdDTO(req: any): ClassIdDTO {
    return {
      id: req.params.id.trim(),
      token: req.headers.authorization!.trim(),
    };
  }

  public static toClassQueryDTO(req: any): ClassQueryDTO {
    return {
      today: req.query.today?.trim()
    };
  }

  public static toDeleteClassesDTO(req: any): DeleteClassesDTO {
    return {
      id: req.params.id.trim(),
      token: req.headers.authorization!.trim(),
      allClasses: req.query.allClasses?.trim()
    };
  }

  public static toChangeCapacityDTO(req: any): ChangeCapacityDTO {
    return {
      id: req.params.id.trim(),
      action: req.params.action.trim(),
      token: req.headers.authorization!.trim(),
    };
  }
}
