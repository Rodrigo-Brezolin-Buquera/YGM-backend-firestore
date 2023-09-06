import { ContractsBusiness } from "../../../../src/modules/contracts/business/contract.Business";
import { ContractController } from "../../../../src/modules/contracts/controller/contract.Controller";
import { ContractBusinessMock } from "../mocks/contract.business.mock";
import { ContractsDatabaseMock, mockContracts } from "../mocks/contract.database.mock";



const contractBusiness = new ContractBusinessMock(new ContractsDatabaseMock) as unknown as ContractsBusiness
const contractController = new ContractController(contractBusiness)

const res: any = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  

  describe("ContractController: FindAllContracts method", () => {
    const req: any = {};
    test("Sucess case", async () => {
      await contractController.findAllContracts(req, res);
      expect(contractBusiness.findAllContracts).toBeCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ result: mockContracts });
    });
  });
  