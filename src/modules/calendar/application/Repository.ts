// import {  } from "../domain/Domain"


export interface CalendarRepository {
    findAllClasses( ) : Promise<void>
    createClass() : Promise<any>
    editClass() : Promise<void>
    deleteClass() : Promise<void>

}