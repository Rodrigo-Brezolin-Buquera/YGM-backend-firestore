import { YogaClass } from "../domain/calendar.Entity"

export interface CalendarRepository {
    findClassesByPeriod(dates: string[]): Promise<YogaClass[]> 
    findClass(id:string): Promise<YogaClass> 
    createClass(yogaClass: YogaClass) : Promise<void>
    deleteClass(id: string) : Promise<void>
    deleteAllClasses(groupId: string) : Promise<void>

}