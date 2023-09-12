import { FirmDatabase } from "../../../../src/modules/firm/database/firm.database";
import { Firm } from "../../../../src/modules/firm/domain/firm.Entity";
import { mockFirm } from "../mocks/firm.database.mock";

const firmDB = new FirmDatabase();

describe("FirmDatabase: Find method", () => {
  test("Sucess Case", async () => {
    const result = await firmDB.find();
    expect(result).toBeInstanceOf(Firm);
  });
});

describe("FirmDatabase: Edit method", () => {
  const input = mockFirm;
  input.setAddress("altered");

  test("Sucess Case", async () => {
    await firmDB.edit(input);
    const result = await firmDB.find();
    expect(result.getAddress()).toBe("altered");
  });

  afterAll(async () => {
    input.setAddress("address");
    await firmDB.edit(input);
  });
});
