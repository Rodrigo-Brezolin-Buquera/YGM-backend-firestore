import { YogaClass } from "../domain/calendar.Entity"

export interface CalendarRepository {
    findAllClasses( ) : Promise<YogaClass[]>
    createClass(yogaClass: YogaClass) : Promise<void>
    editClass(yogaClasses: YogaClass[]) : Promise<void>
    deleteClass(id: string) : Promise<void>
    deleteClasses(yogaClasses: YogaClass[]) : Promise<void>


}