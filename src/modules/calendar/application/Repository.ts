import { YogaClass } from "../domain/Domain"


export interface CalendarRepository {
    findAllClasses( ) : Promise<YogaClass[]>
    createClass(yogaClass: YogaClass) : Promise<void>
    editClass(yogaClasses: YogaClass[]) : Promise<void>
    deleteClass() : Promise<void>

}