import { InvalidName, InvalidVerified } from "../../src/common/customError/invalidRequests";
import { Checkin } from "../../src/modules/booking/domain/booking.Entity";

describe("Tests", () => {
  const obj: any = {
    id: "id",
    verified: true,
    name: "some name",
    date: "20/05/1989",
  };
  test("Sucess case", () => {
    expect.assertions(1);
    try {
      const result = new Checkin(obj.id, obj.verified, obj.name, obj.date);
      expect(result).toBeInstanceOf(Checkin);
    } catch (error) {}
  });
});

describe("Fail name tests on booking entity", () => {
  const obj: any = {
    id: "id",
    verified: true,
    name: "some name",
    date: "20/05/1989",
  };
  const currentError = new InvalidName();

  test("Invalid without name", () => {
    expect.assertions(3);
    obj.name = undefined;
    try {
      new Checkin(obj.id, obj.verified, obj.name, obj.date).checkName();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });
});

describe("Fail verified tests on booking entity", () => {
    const obj: any = {
      id: "id",
      verified: true,
      name: "some name",
      date: "20/05/1989",
    };
    const currentError = new InvalidVerified();
  
    test("Invalid without verified", () => {
    expect.assertions(3);
      obj.verified = undefined;
      try {
        const result = new Checkin(obj.id, obj.verified, obj.name, obj.date).checkVerified();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe(currentError.message);
        expect(error.statusCode).toBe(currentError.statusCode);
      }
    });

    test("Invalid with string verified", () => {
        expect.assertions(3);
          obj.verified = "teste";
          try {
            const result = new Checkin(obj.id, obj.verified, obj.name, obj.date).checkVerified();
          } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toBe(currentError.message);
            expect(error.statusCode).toBe(currentError.statusCode);
          }
        });
  });