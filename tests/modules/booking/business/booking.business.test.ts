import { BookingBusiness } from "../../../../src/modules/booking/business/booking.Business";
import { Checkin } from "../../../../src/modules/booking/domain/booking.Entity";
import { UpdateAction } from "../../../../src/modules/booking/domain/DTOs/booking.changeEntity.dto";
import { BookingDatabaseMock } from "../mocks/booking.database.mock";

const bookingDB = new BookingDatabaseMock();
const bookingBusiness = new BookingBusiness(bookingDB);

describe("BookingBusiness: FindCheckin method", () => {
  test("Sucess case", async () => {
    const result = await bookingBusiness.findCheckin({ id: "return+checkin" });
    expect(result).toBeInstanceOf(Checkin);
    expect(bookingDB.findCheckin).toBeCalledWith("return+checkin");
  });

  test("Sucess case: without return", async () => {
    const result = await bookingBusiness.findCheckin({ id: "id" });
    expect(result).toBeNull();
    expect(bookingDB.findCheckin).toBeCalledWith("id");
  });
});

describe("BookingBusiness: FindUserCheckin method", () => {
  test("Sucess case: default", async () => {
    const input = { id: "return+checkin" }
    const result = await bookingBusiness.findUserCheckin(input);
    expect(result[0]).toBeInstanceOf(Checkin);
    expect(bookingDB.findByEntity).toBeCalledWith("return+checkin", "contractId", 5);
  });

  test("Sucess case: with limit", async () => {
    const input = { id: "return+checkin", limit: 10 }
    const result = await bookingBusiness.findUserCheckin(input);
    expect(result[0]).toBeInstanceOf(Checkin);
    expect(bookingDB.findByEntity).toBeCalledWith("return+checkin", "contractId", 10);
  });
});

describe("BookingBusiness: FindByEntity method", () => {
  test("Sucess case: Contract entity", async () => {
    const input = {
      id: "id",
      entity: "contract",
    };
    const result = await bookingBusiness.findByEntity(input);
    expect(result[0]).toBeInstanceOf(Checkin);
    expect(bookingDB.findByEntity).toBeCalledWith("id", "contractId", 5);
  });

  test("Sucess case: Class entity", async () => {
    const input = {
      id: "id",
      entity: "class",
    };
    const result = await bookingBusiness.findByEntity(input);
    expect(result[0]).toBeInstanceOf(Checkin);
    expect(bookingDB.findByEntity).toBeCalledWith("id", "yogaClassId", 20);
  });

  test("Sucess case: with limit", async () => {
    const input = {
      id: "id",
      entity: "class",
      limit: 7,
    };
    const result = await bookingBusiness.findByEntity(input);
    expect(result[0]).toBeInstanceOf(Checkin);
    expect(bookingDB.findByEntity).toBeCalledWith("id", "yogaClassId", 7);
  });

  test("Error: without entity", async () => {
    expect.assertions(2)
    try {
      const input = {
        id: "id",
        entity: "asd",
      };
      await bookingBusiness.findByEntity(input);
    } catch (error: any) {
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe("A entidade precisa ser contract ou class");
    }
  });
});

describe("BookingBusiness: CreateCheckin method", () => {
  test("Sucess case", async () => {
    const input = {
      contractId: "contractId",
      yogaClassId: "yogaClassId",
      date: "05/08/2022",
      name: "name",
      time: "07:00",
    };
    const result = await bookingBusiness.createCheckin(input);
    expect(result).toBeUndefined();
    expect(bookingDB.createCheckin).toBeCalledWith(expect.any(Checkin));
    expect(bookingDB.changeEntity).toHaveBeenNthCalledWith(1, "contractId", {
      key: "availableClasses",
      value: UpdateAction.SUBTRACT,
      collection: "contracts",
    });
    expect(bookingDB.changeEntity).toHaveBeenNthCalledWith(2, "yogaClassId", {
      key: "capacity",
      value: UpdateAction.SUBTRACT,
      collection: "calendar",
    });
  });

  test("Error: Checkin already exists ", async () => {
    expect.assertions(2)
    try {
      const input = {
        contractId: "return",
        yogaClassId: "checkin",
        date: "05/08/2022",
        name: "name",
        time: "07:00",
      };
      await bookingBusiness.createCheckin(input);
    } catch (error: any) {
      expect(error.statusCode).toBe(406);
      expect(error.message).toBe("Checkin já realizado");
    }
  });
});

describe("BookingBusiness: CreateSingleCheckin method", () => {
  test("Sucess case", async () => {
    const input = {
      yogaClassId: "yogaClassId",
      date: "05/08/2022",
      name: "name",
      time: "07:00",
    };
    const result = await bookingBusiness.createSingleCheckin(input);
    expect(result).toBeUndefined();
    expect(bookingDB.createCheckin).toBeCalledWith(expect.any(Checkin));
    expect(bookingDB.changeEntity).toBeCalledWith("yogaClassId", {
      key: "capacity",
      value: UpdateAction.SUBTRACT,
      collection: "calendar",
    });
  });

  test("Error: Checkin already exists ", async () => {
    expect.assertions(2)
    try {
      const input = {
        yogaClassId: "checkin",
        date: "05/08/2022",
        name: "return",
        time: "07:00",
      };
      await bookingBusiness.createSingleCheckin(input);
    } catch (error: any) {
      expect(error.statusCode).toBe(406);
      expect(error.message).toBe("Checkin já realizado");
    }
  });
});

describe("BookingBusiness: DeleteCheckin method", () => {
    test("Sucess case: single type", async () => {
      const input = {
        id: "contractId+yogaClassId",
        type: "single"
       
      };
      const result = await bookingBusiness.deleteCheckin(input);
      expect(result).toBeUndefined();
      expect(bookingDB.deleteCheckin).toBeCalledWith(input.id);
      
    });

    test("Sucess case: default type", async () => {
        const input = {
          id: "contractId+yogaClassId"
        };
        const result = await bookingBusiness.deleteCheckin(input);
        expect(result).toBeUndefined();
        expect(bookingDB.deleteCheckin).toBeCalledWith(input.id);
        expect(bookingDB.changeEntity).toHaveBeenNthCalledWith(1, "contractId", {
            key: "availableClasses",
            value: UpdateAction.ADD,
            collection: "contracts",
          });
          expect(bookingDB.changeEntity).toHaveBeenNthCalledWith(2, "yogaClassId", {
            key: "capacity",
            value: UpdateAction.ADD,
            collection: "calendar",
          });
        
      });
  
    test("Error: Invalid Checkin id", async () => {
        expect.assertions(2)
      try {
        const input = {
            id: "wrong/id"
          };
        await bookingBusiness.deleteCheckin(input);
      } catch (error: any) {
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe("Entre com id de checkin válido");
      }
    });
  });