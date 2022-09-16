import { IDateService } from "../../../../src/common/aplication/common.ports";

export class DateServiceMock implements IDateService {
    adjustDate(date: string): string {
        return "01/01/2001"
    }
    addOneWeek(date: string): string {
        return "01/01/2001"
    }
    calculateEndDate(date: string, durationInMonths: number): string {
        return "01/01/2001"
    }
    getToday(): string {
        return "01/01/2001"
    }
   
  }
  