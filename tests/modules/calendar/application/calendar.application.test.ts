// import { InvalidAction } from "../../../../src/common/customError/invalidRequests";
// import { CalendarApplication } from "../../../../src/modules/calendar/business/calendar.Business";
// import {
//   ChangeCapacityDTO,
//   ClassQueryDTO,
//   CreateClassDTO,
//   DeleteClassesDTO,
//   EditClassDTO,
// } from "../../../../src/modules/calendar/domain/calendar.DTO";
// import { YogaClass } from "../../../../src/modules/calendar/domain/calendar.Entity";
// import { DateServiceMock } from "../../../common/application/mocks/common.Dates.service.mock";
// import { IdServiceMock } from "../../../common/application/mocks/common.Id.service.mock";
// import { TokenServiceMock } from "../../../common/application/mocks/common.token.service.mock";
// import { CalendarInfrastructureMock } from "./mocks/calendar.infrastructure.mock";

// const calendarInfrastructureMock = new CalendarInfrastructureMock();
// const tokenServiceMock = new TokenServiceMock();
// const idServiceMock = new IdServiceMock();
// const dateServiceMock = new DateServiceMock();

// const calendarApplication = new CalendarApplication(
//   calendarInfrastructureMock,
//   tokenServiceMock,
//   idServiceMock,
//   dateServiceMock
// );

// describe("FindAllClasses tests - CalendarApplication ", () => {
//   test("Sucess case with getToday query", async () => {
//     const input: ClassQueryDTO = { today: true };
//     const result = await calendarApplication.findAllClasses(input);
//     expect(result).toBeDefined();
//     expect(calendarInfrastructureMock.findClassesByDate).toBeCalledTimes(1);
//   });
// });

// describe("FindClassById tests - CalendarApplication ", () => {
//   test("Sucess case with no query", async () => {
//     const input = { today: undefined };
//     const result = await calendarApplication.findAllClasses(input as any);
//     expect(result).toBeDefined();
//     expect(result[0]).toBeInstanceOf(YogaClass);
//     expect(calendarInfrastructureMock.findAllClasses).toBeCalledTimes(1);
//   });
// });

// describe("CreateClass tests - CalendarApplication ", () => {
//   const input: CreateClassDTO = {
//     name: "Hatha Yoga",
//     date: "2022-01-01",
//     day: "Segunda",
//     time: "19:00",
//     teacher: "Rodrigo",
//     quantity: 20,
//     capacity: 8,
//     token: "TOKEN",
//   };

//   test("Sucess case with all querys", async () => {
//     const result = await calendarApplication.createClass(input);
//     expect(result).toBeUndefined();
//     expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1);
//     expect(dateServiceMock.adjustDate).toBeCalledTimes(1);
//     expect(idServiceMock.generateId).toBeCalledTimes(1 + input.quantity);
//     expect(dateServiceMock.addOneWeek).toBeCalledTimes(input.quantity);
//     expect(calendarInfrastructureMock.createClass).toBeCalledTimes(
//       input.quantity
//     );
//   });

//   test("Sucess case with negative quantity query", async () => {
//     input.quantity = -1;

//     const result = await calendarApplication.createClass(input);
//     expect(result).toBeUndefined();
//     expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1);
//     expect(dateServiceMock.adjustDate).toBeCalledTimes(1);
//     expect(idServiceMock.generateId).toBeCalledTimes(51);
//     expect(dateServiceMock.addOneWeek).toBeCalledTimes(50);
//     expect(calendarInfrastructureMock.createClass).toBeCalledTimes(50);
//   });
//   test("Sucess case without quantity query", async () => {
//     input.quantity = undefined as any;
    
//       const result = await calendarApplication.createClass(input);
//       expect(result).toBeUndefined();
//       expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1);
//       expect(dateServiceMock.adjustDate).toBeCalledTimes(1);
//       expect(idServiceMock.generateId).toBeCalledTimes(51);
//       expect(dateServiceMock.addOneWeek).toBeCalledTimes(50);
//       expect(calendarInfrastructureMock.createClass).toBeCalledTimes(50);
 
//   });

//   test("Sucess case without quantity query", async () => {
//     input.quantity = -1;

//     const result = await calendarApplication.createClass(input);
//     expect(result).toBeUndefined();
//     expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1);
//     expect(dateServiceMock.adjustDate).toBeCalledTimes(1);
//     expect(idServiceMock.generateId).toBeCalledTimes(51);
//     expect(dateServiceMock.addOneWeek).toBeCalledTimes(50);
//     expect(calendarInfrastructureMock.createClass).toBeCalledTimes(50);
//   });

//   test("Sucess case without capacity query", async () => {
//     input.quantity = 50;
//     input.capacity = undefined as any;

//     const result = await calendarApplication.createClass(input);
//     expect(result).toBeUndefined();
//     expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1);
//     expect(dateServiceMock.adjustDate).toBeCalledTimes(1);
//     expect(idServiceMock.generateId).toBeCalledTimes(51);
//     expect(dateServiceMock.addOneWeek).toBeCalledTimes(50);
//     expect(calendarInfrastructureMock.createClass).toBeCalledTimes(50);
//   });

//   test("Sucess case with negative capacity query", async () => {
//     input.quantity = 50;
//     input.capacity = -1;

//     const result = await calendarApplication.createClass(input);
//     expect(result).toBeUndefined();
//     expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1);
//     expect(dateServiceMock.adjustDate).toBeCalledTimes(1);
//     expect(idServiceMock.generateId).toBeCalledTimes(51);
//     expect(dateServiceMock.addOneWeek).toBeCalledTimes(50);
//     expect(calendarInfrastructureMock.createClass).toBeCalledTimes(50);
//   });
// });

// describe("EditClass tests - CalendarApplication ", () => {
//   test("Sucess case", async () => {
//     const input: EditClassDTO = {
//       name: "Hatha Yoga",
//       time: "19:00",
//       teacher: "Rodrigo",
//       groupId: "ID",
//       changingDate: "01/01/2001",
//       capacity: 1,
//       token: "TOKEN",
//     };
//     const result = await calendarApplication.editClass(input);
//     expect(result).toBeUndefined();
//     expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1);
//     expect(calendarInfrastructureMock.editClass).toBeCalledTimes(1);
//   });
// });

// describe("DeleteClass tests - CalendarApplication ", () => {
//   test("Sucess case without allClass query", async () => {
//     const input: DeleteClassesDTO = {
//       id: "ID",
//       token: "TOKEN",
//       allClasses: false,
//     };
//     const result = await calendarApplication.deleteClasses(input);
//     expect(result).toBeUndefined();
//     expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1);
//     expect(calendarInfrastructureMock.deleteClass).toBeCalledTimes(1);
//   });

//   test("Sucess case with allClass query", async () => {
//     const input: DeleteClassesDTO = {
//       id: "ID",
//       token: "TOKEN",
//       allClasses: true,
//     };
//     const result = await calendarApplication.deleteClasses(input);
//     expect(result).toBeUndefined();
//     expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1);
//     expect(calendarInfrastructureMock.deleteAllClasses).toBeCalledTimes(1);
//   });
// });

// describe("ChangingCapacity tests - CalendarApplication ", () => {
//   test("Sucess case with add params", async () => {
//     const input: ChangeCapacityDTO = {
//       id: "ID",
//       action: "add",
//       token: "TOKEN",
//     };
//     const result = await calendarApplication.changeCapacity(input);
//     expect(result).toBeUndefined();
//     expect(tokenServiceMock.verifyUserPermission).toBeCalledTimes(2);
//     expect(calendarInfrastructureMock.findClassById).toBeCalledTimes(1)
//     expect(calendarInfrastructureMock.changeCapacity).toBeCalledTimes(1);
//   });

//   test("Sucess case with subtract params", async () => {
//     const input: ChangeCapacityDTO = {
//       id: "ID",
//       action: "add",
//       token: "TOKEN",
//     };
//     const result = await calendarApplication.changeCapacity(input);
//     expect(result).toBeUndefined();
//     expect(tokenServiceMock.verifyUserPermission).toBeCalledTimes(2);
//     expect(calendarInfrastructureMock.findClassById).toBeCalledTimes(1)
//     expect(calendarInfrastructureMock.changeCapacity).toBeCalledTimes(1);
//   });

//   test("Fail case with invalid action params", async () => {
//     expect.assertions(3);
//     const currentError = new InvalidAction();
//     try {
//       const input: ChangeCapacityDTO = {
//         id: "ID",
//         action: "gegqwegqw",
//         token: "TOKEN",
//       };
//       await calendarApplication.changeCapacity(input);
//     } catch (error: any) {
//       expect(error).toBeDefined();
//       expect(error).toBeInstanceOf(InvalidAction);
//       expect(error.message).toBe(currentError.message);
//     }
//   });
// });
