import { IdDTO } from "../../../../src/common/domain/common.id.dto";
import { IIdService } from "../../../../src/common/services/common.ports";
import { CalendarRepository } from "../../../../src/modules/calendar/business/calendar.Repository";
import { YogaClass } from "../../../../src/modules/calendar/domain/calendar.Entity";
import { CreateClassDTO } from "../../../../src/modules/calendar/domain/DTOs/calendar.createClass.dto";
import { DeleteClassDTO } from "../../../../src/modules/calendar/domain/DTOs/calendar.deleteClasses.dto";
import { FindByPeriodDTO } from "../../../../src/modules/calendar/domain/DTOs/calendar.findByPeriod.dto";
import { mockClasses } from "./calendar.database.mock";

export class CalendarBusinessMock {
    constructor(
      private calendarDB: CalendarRepository,
      private idService: IIdService
    ) {}
  
    findClassesByPeriod = jest.fn( async({ dates}: FindByPeriodDTO): Promise<YogaClass[]> =>{
        return mockClasses
    
    })
  
    findClass = jest.fn( async({ id }: IdDTO): Promise<YogaClass>=> {
        return mockClasses[0]
    })
  
    createClass = jest.fn( async(input: CreateClassDTO): Promise<void> =>{
     
    })
  
    deleteClasses = jest.fn( async(input: DeleteClassDTO): Promise<void> =>{
      
  })
}