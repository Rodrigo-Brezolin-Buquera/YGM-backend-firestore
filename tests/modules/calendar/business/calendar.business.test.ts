import { CalendarBusiness } from "../../../../src/modules/calendar/business/calendar.Business";
import { getToday } from "../../../../src/modules/calendar/business/calendar.utils.getToday";
import { YogaClass } from "../../../../src/modules/calendar/domain/calendar.Entity";
import { IdServiceMock } from "../../../common/mocks/common.service.id.mock";
import { CalendarDatabaseMock } from "../mocks/calendar.business.mock";

const calendarDB = new CalendarDatabaseMock();
const idService = new IdServiceMock();
const calendarBusiness = new CalendarBusiness(calendarDB, idService);

describe("CalendarBusiness: FindClassesByPeriod method", () => {
  test("Sucess case: without dates ", async () => {
    const result = await calendarBusiness.findClassesByPeriod({});
    expect(result[0]).toBeInstanceOf(YogaClass);
    expect(calendarDB.findClassesByPeriod).toBeCalledWith([getToday()]);
  });

  test("Sucess case: with dates", async () => {
    const input = {
      dates: ["2022-01-01", "2022-10-05"],
    };
    const output = ["01/01/2022", "05/10/2022"];
    const result = await calendarBusiness.findClassesByPeriod(input);
    expect(result[0]).toBeInstanceOf(YogaClass);
    expect(calendarDB.findClassesByPeriod).toBeCalledWith(output);
  });

  test("Error: invalid dates", async () => {
    try {
      const input = { dates: ["01/05/2022"] };
      await calendarBusiness.findClassesByPeriod(input);
    } catch (error: any) {
      expect(error.statusCode).toBe(406);
      expect(error.message).toBe(
        "Data inválida para requisição, use o formato YYYY-MM-DD"
      );
    }
  });
  
  test("Error: empty array ", async () => {
    try {
      const input = { dates: [] };
      await calendarBusiness.findClassesByPeriod(input);
    } catch (error: any) {
      expect(error.statusCode).toBe(406);
      expect(error.message).toBe(
        "Data inválida para requisição, use o formato YYYY-MM-DD"
      );
    }
  });

});
