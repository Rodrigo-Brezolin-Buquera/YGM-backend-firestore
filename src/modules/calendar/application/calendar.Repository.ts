import { YogaClass } from "../domain/calendar.Entity"

export interface CalendarRepository {
    findAllClasses( ) : Promise<YogaClass[]>
    createClass(yogaClass: YogaClass) : Promise<void>
    editClass(yogaClasses: YogaClass) : Promise<void>
    deleteClass(id: string) : Promise<void>
    deleteAllClasses(groupId: string) : Promise<void>
    findClassById(id:string): Promise<YogaClass> 
    changeCapacity(id:string, capacity:number):Promise<void>

}