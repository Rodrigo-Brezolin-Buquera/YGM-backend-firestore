import { ContractsRepository } from "../../../../../src/modules/contracts/application/contracts.Repository";
import { Contract } from "../../../../../src/modules/contracts/domain/contracts.Entity";

export class ContractsInfrastructureMock implements ContractsRepository {
  async findAllContracts(): Promise<Contract[]> {
    return [
      Contract.toContract({
        id: "id",
        name: "name",
        closedContracts: [
          {
            plan: "1x-Mensal",
            ended: "20/12/2010",
          },
        ],
        currentContract: {
          active: true,
          plan: "1x-Mensal",
          started: "20/12/2010",
          ends: "20/12/2011",
          availableClasses: 10,
        },
      }),
    ];
  }
  async findContract(id: string): Promise<Contract> {
    return Contract.toContract({
      id: "id",
      name: "name",
      closedContracts: [
        {
          plan: "1x-Mensal",
          ended: "20/12/2010",
        },
      ],
      currentContract: {
        active: true,
        plan: "1x-Mensal",
        started: "20/12/2010",
        ends: "20/12/2011",
        availableClasses: 10,
      },
    });
  }
  async findContractById(id: string): Promise<Contract> {
    return Contract.toContract({
      id: "id",
      name: "name",
      closedContracts: [
        {
          plan: "1x-Mensal",
          ended: "20/12/2010",
        },
      ],
      currentContract: {
        active: true,
        plan: "1x-Mensal",
        started: "20/12/2010",
        ends: "20/12/2011",
        availableClasses: 10,
      },
    });
  }
  async createContract(contract: Contract): Promise<void> {}
  async editContract(contract: Contract): Promise<void> {}
  async deleteContract(id: string): Promise<void> {}
}
