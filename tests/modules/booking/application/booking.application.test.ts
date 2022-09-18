import { DoubleCheckin, NoAvailableClasses, NoCapacityInClass } from "../../../../src/common/customError/conflicts";
import { InvalidEntity } from "../../../../src/common/customError/invalidRequests";
import { BookingApplication } from "../../../../src/modules/booking/application/booking.Application";
import {
  CheckinIdDTO,
  CheckinTokenDTO,
  CreateCheckinDTO,
  FindCheckinDTO,
  ValidateCheckinDTO,
} from "../../../../src/modules/booking/domain/booking.DTO";
import { Checkin } from "../../../../src/modules/booking/domain/booking.Entity";
import { TokenServiceMock } from "../../../common/application/mocks/common.token.service.mock";
import { BookingInfrastructureMock } from "./mocks/booking.infrastructure.mock";
import { BookingRequestServiceMock } from "./mocks/booking.request.service.mock";

const bookingInfrastructureMock = new BookingInfrastructureMock()
const tokenServiceMock =  new TokenServiceMock()
const bookingRequestServiceMock = new BookingRequestServiceMock()

const bookingApplication = new BookingApplication(
  bookingInfrastructureMock,
  tokenServiceMock,
  bookingRequestServiceMock
);

describe("FindCheckin tests -  BookingApplication ", () => {
  const input: FindCheckinDTO = {
    id: "id",
    entity: "contract",
    token: "Token",
  };

  test("Sucess case - Entity: contract", async () => {
    expect.assertions(2);
    try {
      const result = await bookingApplication.findCheckin(input);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toBeInstanceOf(Checkin); 
      // expect(tokenServiceMock.verifyUserPermission).toBeCalledTimes(1)
      // expect(bookingInfrastructureMock.findById).toBeCalledTimes(1)

    } catch (error: any) {}
  });

  test("Sucess case - Entity: yogaclass", async () => {
    input.entity = "yogaClass";
    expect.assertions(2);
    try {
      const result = await bookingApplication.findCheckin(input);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toBeInstanceOf(Checkin);
      // expect(tokenServiceMock.verifyUserPermission).toBeCalledTimes(1)
      // expect(bookingInfrastructureMock.findById).toBeCalledTimes(1)
    } catch (error: any) {}
  });

  test("Fail case - Invalid Entity", async () => {
    input.entity = "AAAAAAAAA";
    const currentError = new InvalidEntity();
    expect.assertions(3);
    try {
      await bookingApplication.findCheckin(input);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(InvalidEntity);
      expect(error.message).toBe(currentError.message);
    }
  });
});

describe("FindUserCheckins tests -  BookingApplication ", () => {
  const input: CheckinTokenDTO = {
    token: "Token",
  };

  test("Sucess case", async () => {
    expect.assertions(2);
    try {
      const result = await bookingApplication.findUserCheckins(input);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toBeInstanceOf(Checkin);
      // expect(tokenServiceMock.getTokenId).toBeCalledTimes(1)
      // expect(bookingInfrastructureMock.findById).toBeCalledTimes(1)
    
    } catch (error: any) {}
  });
});

describe("CreateCheckin tests -  BookingApplication ", () => {
  const getInitialInput = (): CreateCheckinDTO => {
    return {
      token: "Token",
      contractId: "ID",
      yogaClassId: "ID",
    };
  };
  test("Sucess case", async () => {
    const input = getInitialInput();
    expect.assertions(2);
    try {
      const result = await bookingApplication.createCheckin(input);
      expect(result).toBeUndefined();
      expect(tokenServiceMock.verifyUserPermission).toBeCalledTimes(1)
      // expect(bookingRequestServiceMock.requestContract).toBeCalledTimes(1)
      // expect(bookingRequestServiceMock.requestYogaClass).toBeCalledTimes(1)
      // expect(bookingInfrastructureMock.findCheckinById).toBeCalledTimes(1)
    } catch (error: any) {}
  });

  test("Fail case - NoAvailableClasses Error", async () => {
    const input = getInitialInput();
    input.token = "NOCLASS";
    const currentError = new NoAvailableClasses();
    expect.assertions(3);

    try {
      await bookingApplication.createCheckin(input);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(NoAvailableClasses);
      expect(error.message).toBe(currentError.message);
    }
  });

  test("Fail case - NoCapacityInClass Error", async () => {
    const input = getInitialInput();
    input.token = "NOCAPACITY";
    const currentError = new NoCapacityInClass();
    expect.assertions(3);

    try {
      await bookingApplication.createCheckin(input);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(NoCapacityInClass);
      expect(error.message).toBe(currentError.message);
    }
  });

  test("Fail case - DoubleCheckin Error", async () => {
    const input = getInitialInput();
    input.contractId ="RETURN"
    input.yogaClassId = "CHECKIN" ;
    const currentError = new DoubleCheckin();
    expect.assertions(3);

    try {
      await bookingApplication.createCheckin(input);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(DoubleCheckin);
      expect(error.message).toBe(currentError.message);
    }
  });

});

describe("ValidateCheckin tests -  BookingApplication ", () => {
  const input: ValidateCheckinDTO = {
    checkinId: "ID",
    token: "Token",
    verified: false,
  };

  test("Sucess case", async () => {
    expect.assertions(2);
    try {
      const result = await bookingApplication.validateCheckin(input);
      expect(result).toBeUndefined();
      expect(tokenServiceMock.verifyUserPermission).toBeCalledTimes(1)
    
      // expect(bookingInfrastructureMock.validateCheckin).toBeCalledTimes(1)
      
    } catch (error: any) {}
  });
});

describe("DeleteCheckin tests -  BookingApplication ", () => {
  const input: CheckinIdDTO = {
    id: "ID",
    token: "Token",
  };
  test("Sucess case", async () => {
    expect.assertions(2);
    try {
      const result = await bookingApplication.deleteCheckin(input);
      expect(result).toBeUndefined();
      expect(tokenServiceMock.verifyUserPermission).toBeCalledTimes(1)
      // expect(bookingRequestServiceMock.requestChangeClass).toBeCalledTimes(1)
      // expect(bookingRequestServiceMock.requestChangeCapacity).toBeCalledTimes(1)
      // expect(bookingInfrastructureMock.deleteCheckin).toBeCalledTimes(1)
    } catch (error: any) {}
  });
});

describe("DeleteAllCheckinByContract tests -  BookingApplication ", () => {
  const input: CheckinIdDTO = {
    id: "ID",
    token: "Token",
  };
  test("Sucess case", async () => {
    expect.assertions(3);
    try {
      const result = await bookingApplication.deleteAllCheckinByContract(input);
      expect(result).toBeUndefined();
      expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1)
    
      expect(bookingInfrastructureMock.deleteAllCheckinByContract).toBeCalledTimes(1)
    } catch (error: any) {}
  });
});
