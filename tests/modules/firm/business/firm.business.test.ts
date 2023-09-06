import { FirmBusiness } from "../../../../src/modules/firm/business/firm.Business";
import { Firm } from "../../../../src/modules/firm/domain/firm.Entity";
import { FirmDatabaseMock } from "../mocks/firm.database.mock";

const firmDB = new FirmDatabaseMock();
const firmBusiness = new FirmBusiness(firmDB);

describe("FirmBusiness: Find method", () => {
  test("Sucess case", async () => {
    const result = await firmBusiness.find();
    expect(result).toBeInstanceOf(Firm);
    expect(firmDB.find).toBeCalledTimes(1);
  });
});

describe("FirmBusiness: Edit method", () => {
  test("Sucess case", async () => {
    const input = {
      address: "address2",
      email: "email2",
      facebook: "facebook2",
      instagram: "instagram2",
      phone: "phone2",
      website: "website2",
      whatsapp: "whatsapp2",
    };
    await firmBusiness.edit(input);
    const firm = Firm.toModel(input);
    expect(firmDB.edit).toBeCalledWith(firm);
  });

  test("Sucess case: partial input", async () => {
    await firmBusiness.edit({ address: "address2" });
    expect(firmDB.edit).toBeCalledTimes(1);
  });
});
