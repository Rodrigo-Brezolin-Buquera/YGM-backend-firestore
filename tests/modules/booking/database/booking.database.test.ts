import { BookingDatabase } from "../../../../src/modules/booking/database/booking.Database";
import { Checkin } from "../../../../src/modules/booking/domain/booking.Entity";
import { CalendarDatabase } from "../../../../src/modules/calendar/database/calendar.Database";
import { ContractDatabase } from "../../../../src/modules/contracts/database/contracts.Database";
import { Contract } from "../../../../src/modules/contracts/domain/contract.Entity";

const bookingDB = new BookingDatabase();
const contractDB = new ContractDatabase();
const calendarDB = new CalendarDatabase();

describe("BookingDatabase: CreateCheckin method", () => {
  test("Sucess case", async () => {
    const input = Checkin.toModel({
      id: "00-test-id+3c875a5e-ff9d-4eaa-a5d7-2445654889b8",
      contractId: "00-test-id",
      yogaClassId: "3c875a5e-ff9d-4eaa-a5d7-2445654889b8",
      date: "05/08/2022",
      name: "name",
      time: "07:00",
    });

    const result = await bookingDB.createCheckin(input);
    expect(result).toBeUndefined();
  });
});

describe("BookingDatabase: FindCheckin method", () => {
  test("Sucess case", async () => {
    const input = "00-test-id+3c875a5e-ff9d-4eaa-a5d7-2445654889b8";
    const result = await bookingDB.findCheckin(input);
    expect(result).toBeInstanceOf(Checkin);
  });

  test("Sucess case: return null", async () => {
    const input = "00";
    const result = await bookingDB.findCheckin(input);
    expect(result).toBeNull();
  });
});

describe("BookingDatabase: FindByEntity method", () => {
  test("Sucess case: contract entity", async () => {
    const result = await bookingDB.findByEntity("00-test-id", "contractId", 1);
    expect(result[0]).toBeInstanceOf(Checkin);
  });

  test("Sucess case: contract entity", async () => {
    const result = await bookingDB.findByEntity(
      "3c875a5e-ff9d-4eaa-a5d7-2445654889b8",
      "yogaClassId",
      1
    );
    expect(result[0]).toBeInstanceOf(Checkin);
  });

  test("Sucess case: nothing found", async () => {
    const result = await bookingDB.findByEntity(
      "3c8754889b8",
      "yogaClassId",
      1
    );
    expect(result).toHaveLength(0);
  });
});

describe("BookingDatabase: DeleteCheckin method", () => {
  test("Sucess case", async () => {
    const input = "00-test-id+3c875a5e-ff9d-4eaa-a5d7-2445654889b8";
    const result = await bookingDB.deleteCheckin(input);
    expect(result).toBeUndefined();
  });
});

describe("BookingDatabase: ChangeEntity method", () => {
  test("Sucess case: contract - subtract", async () => {
    const id = "00-test-id";
    const input = {
      key: "availableClasses",
      value: -1,
      collection: "contracts",
    };

    const contract = await contractDB.findContract(id);
    const firstValue = contract!.getAvailableClasses();
    await bookingDB.changeEntity(id, input);
    const changedContract = await contractDB.findContract(id);
    const secondValue = changedContract!.getAvailableClasses();

    expect(secondValue).toBe(firstValue! + input.value);
  });

  test("Sucess case: contract - add", async () => {
    const id = "00-test-id";
    const input = {
      key: "availableClasses",
      value: 1,
      collection: "contracts",
    };

    const contract = await contractDB.findContract(id);
    const firstValue = contract!.getAvailableClasses();
    await bookingDB.changeEntity(id, input);
    const changedContract = await contractDB.findContract(id);
    const secondValue = changedContract!.getAvailableClasses();

    expect(secondValue).toBe(firstValue! + input.value);
  });

  test("Sucess case: class - subtract", async () => {
    const id = "3c875a5e-ff9d-4eaa-a5d7-2445654889b8";
    const input = {
      key: "capacity",
      value: -1,
      collection: "calendar",
    };

    const yogaClass = await calendarDB.findClass(id);
    const firstValue = yogaClass!.getCapacity();
    await bookingDB.changeEntity(id, input);
    const changedClass = await calendarDB.findClass(id);
    const secondValue = changedClass!.getCapacity();

    expect(secondValue).toBe(firstValue! + input.value);
  });

  test("Sucess case: class - add", async () => {
    const id = "3c875a5e-ff9d-4eaa-a5d7-2445654889b8";
    const input = {
      key: "capacity",
      value: 1,
      collection: "calendar",
    };

    const yogaClass = await calendarDB.findClass(id);
    const firstValue = yogaClass!.getCapacity();
    await bookingDB.changeEntity(id, input);
    const changedClass = await calendarDB.findClass(id);
    const secondValue = changedClass!.getCapacity();

    expect(secondValue).toBe(firstValue! + input.value);
  });

  test("Error: entity not found", async () => {
      expect.assertions(2)
    try {
      const id = "3c875a5e-ff9";
      const input = {
        key: "capacity",
        value: 1,
        collection: "calendar",
      };

      await bookingDB.changeEntity(id, input);
    } catch (error:any) {
        expect(error.statusCode).toBe(404)
        expect(error.message).toBe("Não possui possível encontrar a aula/aluno")

    }
  });

  test("Error: no available classes", async () => {
    expect.assertions(2)
  try {
    const id = "6fa8e7c1-3533-4173-b9b4-5fd4f0dcbd9e";
    const input = {
      key: "capacity",
      value: -1,
      collection: "calendar",
    };

    await bookingDB.changeEntity(id, input);
  } catch (error:any) {
      expect(error.statusCode).toBe(406)
      expect(error.message).toBe("Não há mais aulas disponíveis")

  }
});
});
