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

  describe("ContractController: FindContract method", () => {
    const req: any = {params:{}};
    test("Sucess case", async () => {
        req.body = { tokenId:"id"}
      await contractController.findContract(req, res);
      expect(contractBusiness.findContract).toBeCalledWith({id:"id"});
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ result: mockContracts[0] });
    });
  });
  
  describe("ContractController: FindContractById method", () => {
    const req: any = {params:{}};
    test("Sucess case", async () => {
        req.params.id ="id"
      await contractController.findContractById(req, res);
      expect(contractBusiness.findContract).toBeCalledWith({id:"id"});
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ result: mockContracts[0] });
    });
  });

  describe("ContractController: CreateContract method", () => {
    const req: any = {params:{}};
    test("Sucess case", async () => {
        req.params.userId ="id"
        req.body ={
            name: "name" ,
            plan: "plan",
            started: "2022-05-05"
        }

      const output = {...req.body, id: "id"}  
      await contractController.createContract(req, res);
      expect(contractBusiness.createContract).toBeCalledWith(output);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ message: "Contrato criado com sucesso" });
    });
  });

  describe("ContractController: ChangePlan method", () => {
    const req: any = {params:{}};
    test("Sucess case", async () => {
        req.params.id ="id"
        req.body ={
            plan: "plan",
            started: "2022-05-05"
        }

      const output = {...req.body, id: "id"}  
      await contractController.changePlan(req, res);
      expect(contractBusiness.changePlan).toBeCalledWith(output);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: "Contrato editado com sucesso" });
    });
  });

  
  describe("ContractController: ChangeClasses method", () => {
    const req: any = {params:{}};
    test("Sucess case", async () => {
        req.params.id ="id"
        req.body ={
            availableClasses: 10
        }

      const output = {...req.body, id: "id"}  
      await contractController.changeClasses(req, res);
      expect(contractBusiness.changeClasses).toBeCalledWith(output);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: "Quantidade de aulas alteradas"});
    });
  });