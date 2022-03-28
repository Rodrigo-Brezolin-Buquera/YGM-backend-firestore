import { YogaClass } from "../domain/Domain"


export interface CalendarRepository {
    findAllClasses( ) : Promise<YogaClass[]>
    createClass(yogaClass: YogaClass) : Promise<any>
    editClass() : Promise<void>
    deleteClass() : Promise<void>

}