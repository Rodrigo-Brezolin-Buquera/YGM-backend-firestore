import { YogaClass } from "../domain/calendar.Entity"

export interface CalendarRepository {
    findAllClasses() : Promise<YogaClass[]>
    findClassesByDate(date: string): Promise<YogaClass[]> 
    findClassById(id:string): Promise<YogaClass> 
    createClass(yogaClass: YogaClass) : Promise<void>
    editClass(yogaClasses: YogaClass) : Promise<void>
    deleteClass(id: string) : Promise<void>
    deleteAllClasses(groupId: string) : Promise<void>
    changeCapacity(id:string, capacity:number):Promise<void>

}