import { idText } from "typescript";
import { InvalidName, InvalidVerified } from "../../src/common/customError/invalidRequests";
import { Checkin } from "../../src/modules/booking/domain/booking.Entity";

const getInitialObject = (): any => {
  return {
    id: "id",
    verified: true,
    name: "some name",
    date: "20/05/1989",
    classId: "id",
    contractId: "id"
  }
}

const instanceOfCheckin = (obj: any): Checkin => {
  const result = new Checkin(obj.id, obj.name, obj.date, obj.contractId, obj.classId, obj.verified);
  return result;
}
describe("Sucess Tests on booking entity", () => {
  const obj = getInitialObject();
  test("Sucess case", () => {
    expect.assertions(1);
    try {
      const result = instanceOfCheckin(obj);
      expect(result).toBeInstanceOf(Checkin);
    } catch (error:any) {}
  });
});

describe("Fail name tests on booking entity", () => {
  const obj = getInitialObject();
  const currentError = new InvalidName();

  test("Invalid without name", () => {
    expect.assertions(3);
    obj.name = undefined;
    try {
      instanceOfCheckin(obj).checkName();
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });
});

describe("Fail verified tests on booking entity", () => {
  const obj = getInitialObject();
    const currentError = new InvalidVerified();
  
    test("Invalid without verified", () => {
    expect.assertions(3);
      obj.verified = undefined;
      try {
        instanceOfCheckin(obj).checkVerified();
      } catch (error:any) {
        expect(error).toBeDefined();
        expect(error.message).toBe(currentError.message);
        expect(error.statusCode).toBe(currentError.statusCode);
      }
    });

    test("Invalid with string verified", () => {
        expect.assertions(3);
          obj.verified = "teste";
          try {
            const result = instanceOfCheckin(obj).checkVerified();
          } catch (error:any) {
            expect(error).toBeDefined();
            expect(error.message).toBe(currentError.message);
            expect(error.statusCode).toBe(currentError.statusCode);
          }
        });
  });