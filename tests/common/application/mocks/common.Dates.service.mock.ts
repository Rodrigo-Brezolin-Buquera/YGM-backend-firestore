import { IDateService } from "../../../../src/common/aplication/common.ports";

export class DateServiceMock implements IDateService {
    adjustDate =jest.fn((date: string): string => {
        return "01/01/2001"
    })
    addOneWeek = jest.fn((date: string): string =>{
        return "01/01/2001"
    })
    calculateEndDate = jest.fn((date: string, durationInMonths: number): string =>{
        return "01/01/2001"
    })
    getToday = jest.fn((): string =>{
        return "01/01/2001"
    })
   
  }
  