import { Checkin } from "../../../../src/modules/booking/domain/booking.Entity";

const getInitialInput = (): any => {
  return {
    id: "id",
    name: "some name",
    date: "20/05/1989",
    time: "19:00",
    yogaClassId: "classId",
    contractId: "contractId",
  };
};

describe("Booking Entity", () => {
  test("Sucess case", () => {
    const input = getInitialInput();
    const result = Checkin.toModel(input);
    expect(result).toBeInstanceOf(Checkin);
  });

  test("Sucess case: getters", () => {
    const input = getInitialInput();
    const result = Checkin.toModel(input);
    expect(result.getId()).toBe(input.id);
    expect(result.getName()).toBe(input.name);
    expect(result.getDate()).toBe(input.date);
    expect(result.getTime()).toBe(input.time);
    expect(result.getContractId()).toBe(input.contractId);
    expect(result.getClassId()).toBe(input.yogaClassId);
  });
});
