import { CalendarRepository } from "../../../../src/modules/calendar/business/calendar.Repository";
import { YogaClass } from "../../../../src/modules/calendar/domain/calendar.Entity";

export const mockClasses = [
    YogaClass.toModel({
        name: "Hatha Yoga",
        date: "20/12/2022",
        day: "Segunda",
        teacher: "Rodrigo",
        time: "18:00",
        capacity: 9,
        groupId: "id",
        id: "id-class",
      }),
      YogaClass.toModel({
        name: "Hatha Yoga",
        date: "21/12/2022",
        day: "Terça",
        teacher: "Rodrigo",
        time: "19:00",
        capacity: 9,
        groupId: "id",
        id: "id-class2",
      })
]


export class CalendarDatabaseMock implements CalendarRepository {
  findClassesByPeriod = jest.fn(async (dates: string[]): Promise<YogaClass[]>  =>{
      return mockClasses
  })
  findClass = jest.fn(async (id: string): Promise<YogaClass> => {
      return mockClasses[0]
  })
  
  createClass = jest.fn(async (yogaClass: YogaClass): Promise<void> => {});
  deleteClass = jest.fn(async (id: string): Promise<void> => {});
  deleteAllClasses = jest.fn(async (groupId: string): Promise<void> => {});

}
