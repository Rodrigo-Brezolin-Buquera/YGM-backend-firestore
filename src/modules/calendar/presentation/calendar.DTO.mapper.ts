import {
  ClassIdDTO,
  CreateClassDTO,
  DeleteClassesDTO,
  EditClassDTO,
  ClassQueryDTO,
  ChangeCapacityDTO,
} from "../domain/calendar.DTO";

export class CalendarDTOMapper {
  public static toCreateClassDTO(req: any): CreateClassDTO {
    return {
      name: req.body.name?.trim(),
      date: req.body.date?.trim(),
      day: req.body.day?.trim(),
      time: req.body.time?.trim(),
      teacher: req.body.teacher?.trim(),
      quantity: Number(req.query.quantity),
      capacity: Number(req.body.capacity),
      token: req.headers.authorization!,
    };
  }

  public static toEditClassDTO(req: any): EditClassDTO {
    return {
      name: req.body.name?.trim(),
      time: req.body.time?.trim(),
      teacher: req.body.teacher?.trim(),
      changingDate: req.body.changingDate?.trim(),
      capacity: Number(req.body.capacity),
      groupId: req.params.groupId,
      token: req.headers.authorization!,
    };
  }

  public static toClassIdDTO(req: any): ClassIdDTO {
    return {
      id: req.params.id,
      token: req.headers.authorization!,
    };
  }

  public static toClassQueryDTO(req: any): ClassQueryDTO {
    return {
      today: req.query.today,
    };
  }

  public static toDeleteClassesDTO(req: any): DeleteClassesDTO {
    return {
      id: req.params.id,
      token: req.headers.authorization!,
      allClasses: req.query.allClasses,
    };
  }

  public static toChangeCapacityDTO(req: any): ChangeCapacityDTO {
    return {
      id: req.params.id,
      action: req.params.action,
      token: req.headers.authorization!,
    };
  }
}
