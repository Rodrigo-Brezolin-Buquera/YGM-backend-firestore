import { ContractsRepository } from "../../../../src/modules/contracts/business/contracts.Repository";
import { Contract } from "../../../../src/modules/contracts/domain/contract.Entity";

export const mockContracts = [
  Contract.toModel({
    id: "id",
    name: "name",
    plan: "1x-Mensal",
    started: "20/12/2010",
    ends: "20/12/2011",
    availableClasses: 10,
  }),
  Contract.toModel({
    id: "id-2",
    name: "second name",
    plan: "Gympass",
    started: "20/12/2010",
    ends: null,
    availableClasses: null,
  }),
];

export class ContractsDatabaseMock implements ContractsRepository {
  

  findAllContracts = jest.fn(async (): Promise<Contract[]> => {
    return mockContracts;
  });
  findContract = jest.fn(async (id: string): Promise<Contract | null> => {
      const result = mockContracts.find(i=> i.getId() ===id)
    return result ?? null
  });
 
  createContract = jest.fn(async (contract: Contract): Promise<void> => {});
  editContract = jest.fn(async (contract: Contract): Promise<void> => {});
  activeUser = jest.fn(async (id: string): Promise<void> => {});
}
