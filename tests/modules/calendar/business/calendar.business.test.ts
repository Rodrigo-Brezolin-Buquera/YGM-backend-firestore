import { CalendarBusiness } from "../../../../src/modules/calendar/business/calendar.Business";
import { getToday } from "../../../../src/modules/calendar/business/calendar.utils.getToday";
import { YogaClass } from "../../../../src/modules/calendar/domain/calendar.Entity";
import { CreateClassDTO } from "../../../../src/modules/calendar/domain/DTOs/calendar.createClass.dto";
import { DeleteClassDTO } from "../../../../src/modules/calendar/domain/DTOs/calendar.deleteClasses.dto";
import { IdServiceMock } from "../../../common/mocks/common.service.id.mock";
import { CalendarDatabaseMock } from "../mocks/calendar.database.mock";

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
    expect.assertions(2);
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
    expect.assertions(2);
    try {
      const input = { dates: [] };
      await calendarBusiness.findClassesByPeriod(input);
    } catch (error: any) {
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe("Insira um array de datas");
    }
  });
});

describe("CalendarBusiness: FindClass method", () => {
  test("Sucess case", async () => {
    const result = await calendarBusiness.findClass({ id: "id" });
    expect(result).toBeInstanceOf(YogaClass);
    expect(calendarDB.findClass).toBeCalledWith("id");
  });
});

describe("CalendarBusiness: CreateClasses method", () => {
  test("Sucess case: complete input", async () => {
    const input: CreateClassDTO = {
      name: "Hatha Yoga",
      date: "2022-01-01",
      day: "Segunda",
      time: "19:00",
      teacher: "Rodrigo",
      quantity: 1,
      capacity: 10,
    };
    const result = await calendarBusiness.createClass(input);
    expect(result).toBeUndefined();
    expect(calendarDB.createClass).toBeCalledTimes(1);
  });

  test("Sucess case: quantity test", async () => {
    const input: CreateClassDTO = {
      name: "Hatha Yoga",
      date: "2022-01-01",
      day: "Segunda",
      time: "19:00",
      teacher: "Rodrigo",

      quantity: 10,
      capacity: 10,
    };
    const result = await calendarBusiness.createClass(input);
    expect(result).toBeUndefined();
    expect(calendarDB.createClass).toBeCalledTimes(10);
  });

  test("Sucess case: no capacity test", async () => {
    const input = {
      name: "Hatha Yoga",
      date: "2022-01-01",
      day: "Segunda",
      time: "19:00",
      teacher: "Rodrigo",
      quantity: 1,
    } as CreateClassDTO;
    const result = await calendarBusiness.createClass(input);
    expect(result).toBeUndefined();
    expect(calendarDB.createClass).toBeCalledTimes(1);
  });

  test("Sucess case: no quantity test", async () => {
    const input = {
      name: "Hatha Yoga",
      date: "2022-01-01",
      day: "Segunda",
      time: "19:00",
      teacher: "Rodrigo",
    } as CreateClassDTO;
    const result = await calendarBusiness.createClass(input);
    expect(result).toBeUndefined();
    expect(calendarDB.createClass).toBeCalledTimes(50);
  });
});

describe("CalendarBusiness: DeleteClasses method", () => {
  test("Sucess case: single class", async () => {
    const input = { id: "id" } as DeleteClassDTO;
    const result = await calendarBusiness.deleteClasses(input);
    expect(result).toBeUndefined();
    expect(calendarDB.deleteClass).toBeCalledWith("id");
  });

  test("Sucess case:  all classes", async () => {
    const input = { id: "groupId", allClasses: true };
    const result = await calendarBusiness.deleteClasses(input);
    expect(result).toBeUndefined();
    expect(calendarDB.deleteAllClasses).toBeCalledWith("groupId");
  });
});
