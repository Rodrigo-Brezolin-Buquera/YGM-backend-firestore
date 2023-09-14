import { CalendarBusiness } from "../../../../src/modules/calendar/business/calendar.Business";
import { CalendarController } from "../../../../src/modules/calendar/controller/calendar.Controller";
import { DeleteClassDTO } from "../../../../src/modules/calendar/domain/DTOs/calendar.deleteClasses.dto";
import { IdServiceMock } from "../../../common/mocks/common.service.id.mock";
import { CalendarBusinessMock } from "../mocks/calendar.business.mock";
import {
  CalendarDatabaseMock,
  mockClasses,
} from "../mocks/calendar.database.mock";

const calendarBusiness = new CalendarBusinessMock(
  new CalendarDatabaseMock(),
  new IdServiceMock()
) as unknown as CalendarBusiness;

const calendarController = new CalendarController(calendarBusiness);

const res: any = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
};

describe("CalendarController: FindClassesByPeriod method", () => {
  const req: any = { query: {} };

  test("Sucess case: without dates ", async () => {
    await calendarController.findClassesByPeriod(req, res);
    expect(calendarBusiness.findClassesByPeriod).toBeCalledWith({
      dates: undefined,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ result: mockClasses });
  });

  test("Sucess case: with dates", async () => {
    req.query.dates = JSON.stringify(["2022-05-05"]);
    await calendarController.findClassesByPeriod(req, res);
    expect(calendarBusiness.findClassesByPeriod).toBeCalledWith({
      dates: ["2022-05-05"],
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ result: mockClasses });
  });
});


describe("CalendarController: FindClass method", () => {
  const req: any = { params: {} };

  test("Sucess case ", async () => {
    req.params.id = "id";
    await calendarController.findClass(req, res);
    expect(calendarBusiness.findClass).toBeCalledWith({ id: "id" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ result: mockClasses[0] });
  });
});

describe("CalendarController: FindClass method", () => {
  const req: any = {};

  test("Sucess case: complete input ", async () => {
    req.body = {
      name: "Hatha Yoga",
      date: "2022-01-01",
      day: "Segunda",
      time: "19:00",
      teacher: "Rodrigo",
      quantity: 1,
      capacity: 10,
    };
    await calendarController.createClass(req, res);
    expect(calendarBusiness.createClass).toBeCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({ message: "Aula criada" });
  });

  test("Sucess case: without capacity", async () => {
    req.body = {
      name: "Hatha Yoga",
      date: "2022-01-01",
      day: "Segunda",
      time: "19:00",
      teacher: "Rodrigo",
      quantity: 1,
    };
    await calendarController.createClass(req, res);
    expect(calendarBusiness.createClass).toBeCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({ message: "Aula criada" });
  });

  test("Sucess case: without quantity", async () => {
    req.body = {
      name: "Hatha Yoga",
      date: "2022-01-01",
      day: "Segunda",
      time: "19:00",
      teacher: "Rodrigo",
    };
    await calendarController.createClass(req, res);
    expect(calendarBusiness.createClass).toBeCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({ message: "Aula criada" });
  });
});

describe("CalendarController: DeleteClasses method", () => {
  const req: any = { params: {}, query: {} };

  test("Sucess case: with query ", async () => {
    req.params.id = "id";
    req.query.allClasses = true;

    const input = {
      id: req.params.id,
      allClasses: req.query.allClasses,
    };
    await calendarController.deleteClasses(req, res);
    expect(calendarBusiness.deleteClasses).toBeCalledWith(input);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: "Aula(s) deletada(s)" });
  });

  test("Sucess case: without query ", async () => {
    req.params.id = "id";
    req.query.allClasses = undefined;
    const input = {
      id: req.params.id,
      allClasses: false,
    } as DeleteClassDTO;
    await calendarController.deleteClasses(req, res);
    expect(calendarBusiness.deleteClasses).toBeCalledWith(input);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: "Aula(s) deletada(s)" });
  });
});
