import { CalendarRepository } from "../../../../../src/modules/calendar/application/calendar.Repository";
import { YogaClass } from "../../../../../src/modules/calendar/domain/calendar.Entity";

export class CalendarInfrastructure

  implements CalendarRepository
{
    async findAllClasses(): Promise<YogaClass[]> {
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
              })
        ]
       
    }
    async createClass(yogaClass: YogaClass): Promise<void> {
        
    }
    async editClass(yogaClasses: YogaClass): Promise<void> {
        
    }
    async deleteClass(id: string): Promise<void> {
        
    }
    async deleteAllClasses(groupId: string): Promise<void> {
        
    }
    async findClassById(id: string): Promise<YogaClass> {
        return YogaClass.toYogaClass({
                name: "name",
                date: "20/12/2010",
                day: "Segunda",
                teacher: "Rodrigo",
                time: "18:00",
                capacity: 9,
                groupId: "id",
                id: "id",
              })
        
    }
    async changeCapacity(id: string, capacity: number): Promise<void> {
        
    }
 
}
