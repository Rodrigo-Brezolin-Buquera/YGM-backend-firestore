import { InvalidAction } from "../../../../src/common/customError/invalidRequests";
import { ContractsApplication } from "../../../../src/modules/contracts/application/contracts.Application";
import {
    AddContractDTO,
  ChangeClassesDTO,
  ContractIdDTO,
  CreateContractDTO,
  EditContractDTO,
  TokenDTO,
} from "../../../../src/modules/contracts/domain/contracts.DTO";
import { Contract } from "../../../../src/modules/contracts/domain/contracts.Entity";
import { PLAN } from "../../../../src/modules/contracts/domain/contracts.Types";
import { DateServiceMock } from "../../../common/application/mocks/common.Dates.service.mock";
import { IdServiceMock } from "../../../common/application/mocks/common.Id.service.mock";
import { TokenServiceMock } from "../../../common/application/mocks/common.token.service.mock";
import { ContractsInfrastructureMock } from "./mocks/contract.infrastructure.mock";
import { ContractsRequestServiceMock } from "./mocks/contract.request.service.mock";

const contractsInfrastructureMock = new ContractsInfrastructureMock();
const tokenServiceMock = new TokenServiceMock();
const idServiceMock = new IdServiceMock();
const dateServiceMock = new DateServiceMock();
const contractRequestServiceMock = new ContractsRequestServiceMock();

const contractApplication = new ContractsApplication(
  contractsInfrastructureMock,
  tokenServiceMock,
  idServiceMock,
  dateServiceMock,
  contractRequestServiceMock
);

describe("FindAllContracts tests on ContractApplication ", () => {
  test("Sucess case", async () => {
    const input: TokenDTO = {
      token: "TOKEN",
    };
    const result = await contractApplication.findAllContracts(input);
    expect(result).toBeDefined();
    expect(result[0]).toBeInstanceOf(Contract);
    expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1);
    expect(contractsInfrastructureMock.findAllContracts).toBeCalledTimes(1);
  });
});

describe("FindContract tests on ContractApplication ", () => {
  test("Sucess case", async () => {
    const input: TokenDTO = {
      token: "TOKEN",
    };
    const result = await contractApplication.findContract(input);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Contract);
    expect(tokenServiceMock.verifyUserPermission).toBeCalledTimes(1);
    expect(tokenServiceMock.getTokenId).toBeCalledTimes(1);
    expect(contractsInfrastructureMock.findContract).toBeCalledTimes(1);
  });
});

describe("FindContractById tests on ContractApplication ", () => {
  test("Sucess case", async () => {
    const input: ContractIdDTO = {
      token: "TOKEN",
      id: "ID",
    };
    const result = await contractApplication.findContractById(input);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Contract);
    expect(tokenServiceMock.verifyUserPermission).toBeCalledTimes(1);
    expect(contractsInfrastructureMock.findContractById).toBeCalledTimes(1);
  });
});

describe("CreateContract tests on ContractApplication ", () => {
  test("Sucess case", async () => {
    const input: CreateContractDTO = {
      token: "TOKEN",
      email: "EMAIL@EMAIL.com",
      name: "teste tete",
      plan: PLAN.MONTHLYX1,
      date: "2020-01-01",
    };
    const result = await contractApplication.createContract(input);
    expect(result).toBeUndefined();
    expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1);
    expect(idServiceMock.generateId).toBeCalledTimes(1);
    expect(dateServiceMock.adjustDate).toBeCalledTimes(1);
    expect(dateServiceMock.calculateEndDate).toBeCalledTimes(1);
    expect(contractRequestServiceMock.requestCreateUser).toBeCalledTimes(1);
    expect(contractsInfrastructureMock.createContract).toBeCalledTimes(1);
  });
});

describe("EditContract tests on ContractApplication ", () => {
  test("Sucess case", async () => {
    const input: EditContractDTO = {
      token: "TOKEN",
      id: "ID",
      name: "name name",
      plan: PLAN.MONTHLYX1,
      availableClasses: 10,
      ends: "END",
      started: "2021-01-01",
      active: false,
    };
    const result = await contractApplication.editContract(input);
    expect(result).toBeUndefined();
    expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1);
    expect(dateServiceMock.adjustDate).toBeCalledTimes(2);
    expect(contractsInfrastructureMock.editContract).toBeCalledTimes(1);
  });
});

describe("AddNewContract tests on ContractApplication ", () => {
  test("Sucess case", async () => {
    const input: AddContractDTO = {
        token: "TOKEN",
        id: "ID",
        plan: PLAN.MONTHLYX1,
        date: "2021-01-01"
    };
      const result = await contractApplication.addNewContract(input);
      expect(result).toBeUndefined();
      expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1);
      expect(dateServiceMock.adjustDate).toBeCalledTimes(1);
      expect(dateServiceMock.calculateEndDate).toBeCalledTimes(1);
      expect(contractsInfrastructureMock.findContractById).toBeCalledTimes(1);
      expect(contractsInfrastructureMock.editContract).toBeCalledTimes(1);
  });
});

describe("changeClasses tests on ContractApplication ", () => {
  test("Sucess case with add params", async () => {
    const input: ChangeClassesDTO = {
        token: "TOKEN",
        id: "ID",
        action: "add"
    };
      const result = await contractApplication.changeClasses(input);
      expect(result).toBeUndefined();
      expect(tokenServiceMock.verifyUserPermission).toBeCalledTimes(2);
      expect(contractsInfrastructureMock.findContractById).toBeCalledTimes(1);
      expect(contractsInfrastructureMock.editContract).toBeCalledTimes(1);
  });
  test("Sucess case with subtract params", async () => {
        const input: ChangeClassesDTO = {
            token: "TOKEN",
            id: "ID",
            action: "subtract"
        };
          const result = await contractApplication.changeClasses(input);
          expect(result).toBeUndefined();
          expect(tokenServiceMock.verifyUserPermission).toBeCalledTimes(2);
          expect(contractsInfrastructureMock.findContractById).toBeCalledTimes(1);
          expect(contractsInfrastructureMock.editContract).toBeCalledTimes(1);
     
  });
  test("Fail case with InvalidAction", async () => {
      const currentError = new InvalidAction()
      expect.assertions(3)
      try {
        const input: ChangeClassesDTO = {
            token: "TOKEN",
            id: "ID",
            action: "gerherhh"
        };
        await contractApplication.changeClasses(input);
          
      } catch (error:any) {
          expect(error).toBeDefined()
          expect(error).toBeInstanceOf(InvalidAction)
          expect(error.message).toBe(currentError.message)
          
      }
  });
});

describe("deleteContract tests on ContractApplication ", () => {
  test("Sucess case", async () => {
    const input: ContractIdDTO = {
        token: "TOKEN",
        id: "ID",
    };
      const result = await contractApplication.deleteContract(input);
      expect(result).toBeUndefined();
      expect(tokenServiceMock.verifyAdminPermission).toBeCalledTimes(1);  
      expect(contractRequestServiceMock.requestDeleteUser).toBeCalledTimes(1);
      expect(contractRequestServiceMock.requestDeleteCheckins).toBeCalledTimes(1);
      expect(contractsInfrastructureMock.deleteContract).toBeCalledTimes(1);
  });
});
