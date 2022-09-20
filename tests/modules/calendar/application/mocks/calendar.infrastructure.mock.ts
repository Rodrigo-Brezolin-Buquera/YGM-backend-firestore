import { CalendarRepository } from "../../../../../src/modules/calendar/application/calendar.Repository";
import { YogaClass } from "../../../../../src/modules/calendar/domain/calendar.Entity";

export class CalendarInfrastructureMock implements CalendarRepository {
  findAllClasses = jest.fn(async (): Promise<YogaClass[]> => {
    return [
      YogaClass.toYogaClass({
        name: "name",
        date: "20/12/2010",
        day: "Segunda",
        teacher: "Rodrigo",
        time: "18:00",
        capacity: 9,
        groupId: "id",
        id: "id",
      }),
    ];
  });
  createClass = jest.fn(async (yogaClass: YogaClass): Promise<void> => {});
  editClass = jest.fn(async (yogaClasses: YogaClass): Promise<void> => {});
  deleteClass = jest.fn(async (id: string): Promise<void> => {});
  deleteAllClasses = jest.fn(async (groupId: string): Promise<void> => {});
  findClassById = jest.fn(async (id: string): Promise<YogaClass> => {
    return YogaClass.toYogaClass({
      name: "name",
      date: "20/12/2010",
      day: "Segunda",
      teacher: "Rodrigo",
      time: "18:00",
      capacity: 9,
      groupId: "id",
      id: "id",
    });
  });
  changeCapacity = jest.fn(
    async (id: string, capacity: number): Promise<void> => {}
  );
}
