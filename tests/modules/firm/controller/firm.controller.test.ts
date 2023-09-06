import { FirmBusiness } from "../../../../src/modules/firm/business/firm.Business";
import { FirmController } from "../../../../src/modules/firm/controller/firm.Controller";
import { Firm } from "../../../../src/modules/firm/domain/firm.Entity";
import { FirmBusinessMock } from "../mocks/firm.business.mock";
import { FirmDatabaseMock, mockFirm } from "../mocks/firm.database.mock";

const firmBusiness = new FirmBusinessMock(
  new FirmDatabaseMock()
) as unknown as FirmBusiness;

const firmController = new FirmController(firmBusiness);

const res: any = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
};
const req: any = {};

describe("FirmController: Find method", () => {
  test("Sucess case", async () => {
    await firmController.find(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith({ result: mockFirm });
    expect(firmBusiness.find).toBeCalledTimes(1);
  });
});

describe("FirmController: Edit method", () => {
  test("Sucess case", async () => {
    req.body = {
      address: "address",
      email: "email@email.com",
      facebook: "facebook",
      instagram: "instagram",
      phone: "phone",
      website: "website",
      whatsapp: "whatsapp",
    };
    await firmController.edit(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith({ message: "Dados alterados" });
    expect(firmBusiness.edit).toBeCalledTimes(1);
  });


  test("Sucess case: partial input", async () => {
    req.body = {
      address: "address",
      email: "email@email.com",
      facebook: "facebook"
    };
    await firmController.edit(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith({ message: "Dados alterados" });
    expect(firmBusiness.edit).toBeCalledTimes(1);
  });
});
