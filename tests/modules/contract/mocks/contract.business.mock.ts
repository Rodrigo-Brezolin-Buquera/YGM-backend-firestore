import { IdDTO } from "../../../../src/common/domain/common.id.dto";
import { ContractsRepository } from "../../../../src/modules/contracts/business/contracts.Repository";
import { Contract } from "../../../../src/modules/contracts/domain/contract.Entity";
import { ChangeClassesDTO } from "../../../../src/modules/contracts/domain/DTOs/contract.changeClasses.dto";
import { ChangePlanDTO } from "../../../../src/modules/contracts/domain/DTOs/contract.changePlan.dto";
import { CreateContractDTO } from "../../../../src/modules/contracts/domain/DTOs/contract.create.dto";
import { mockContracts } from "./contract.database.mock";

export class ContractBusinessMock {
  constructor(private contractDB: ContractsRepository) {}

  public findAllContracts = jest.fn(async (): Promise<Contract[]> => {
    return mockContracts;
  });

  public findContract = jest.fn(async ({ id }: IdDTO): Promise<Contract> => {
    return mockContracts[0];
  });

  public createContract = jest.fn(
    async (input: CreateContractDTO): Promise<any> => {}
  );

  public changePlan = jest.fn(async (input: ChangePlanDTO): Promise<any> => {});

  public changeClasses = jest.fn(
    async (input: ChangeClassesDTO): Promise<any> => {}
  );
}
