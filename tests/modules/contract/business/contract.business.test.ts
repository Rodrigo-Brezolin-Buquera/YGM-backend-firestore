import { Plan } from "../../../../src/common/domain/common.enum";
import { ContractsBusiness } from "../../../../src/modules/contracts/business/contract.Business";
import { Contract } from "../../../../src/modules/contracts/domain/contract.Entity";
import { ContractsDatabaseMock } from "../mocks/contract.database.mock";

const contractDB = new ContractsDatabaseMock();
const contractBusiness = new ContractsBusiness(contractDB);

describe("ContractBusiness: FindAllContracts method", () => {
  test("Sucess case", async () => {
    const result = await contractBusiness.findAllContracts();
    expect(result[0]).toBeInstanceOf(Contract);
    expect(contractDB.findAllContracts).toBeCalledTimes(1);
  });
});

describe("ContractBusiness:  FindContract  method", () => {
  test("Sucess case", async () => {
    const input = { id: "id" };
    const result = await contractBusiness.findContract(input);
    expect(result).toBeInstanceOf(Contract);
    expect(contractDB.findContract).toBeCalledTimes(1);
  });

  test("Error: Contract not found", async () => {
    expect.assertions(2);
    try {
      const input = { id: "AAAA" };
      await contractBusiness.findContract(input);
    } catch (error: any) {
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe(`Não foi possível encontrar o(a) contrato`);
    }
  });
});

describe("ContractBusiness:  CreateContract  method", () => {
  const input = {
    id: "id-3",
    name: "name NAME",
    plan: Plan.MONTHLYX1,
    started: "2022-01-01",
  };

  test("Sucess case", async () => {
    const result = await contractBusiness.createContract(input);
    expect(result).toBeUndefined();
    expect(contractDB.findContract).toBeCalledTimes(1);
    expect(contractDB.createContract).toBeCalledTimes(1);
  });

  test("Error: Contract already exists", async () => {
    expect.assertions(2);
    try {
      input.id = "id";
      await contractBusiness.createContract(input);
    } catch (error: any) {
      expect(error.statusCode).toBe(409);
      expect(error.message).toBe("Contrato já existe");
    }
  });
});

describe("ContractBusiness:  ChangePlan  method", () => {
  const input = {
    id: "id",
    plan: Plan.MONTHLYX3,
    started: "2022-01-01",
  };
  test("Sucess case", async () => {
    await contractBusiness.changePlan(input);
    expect(contractDB.findContract).toBeCalledTimes(1);
    expect(contractDB.editContract).toBeCalledTimes(1);
  });

  test("Error: Contract not found", async () => {
    expect.assertions(2);
    try {
      input.id = "id-3";
      await contractBusiness.changePlan(input);
    } catch (error: any) {
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe(`Não foi possível encontrar o(a) contrato`);
    }
  });
});

describe("ContractBusiness:  ChangeClasses  method", () => {
    const input = {
      id: "id",
      availableClasses: 10
    };
    test("Sucess case", async () => {
      await contractBusiness.changeClasses(input);
      expect(contractDB.findContract).toBeCalledTimes(1);
      expect(contractDB.editContract).toBeCalledTimes(1);
    });
  
    test("Error: Contract not found", async () => {
      expect.assertions(2);
      try {
        input.id = "id-3";
        await contractBusiness.changeClasses(input);
      } catch (error: any) {
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe(`Não foi possível encontrar o(a) contrato`);
      }
    });
  });