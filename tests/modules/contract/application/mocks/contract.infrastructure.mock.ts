import { ContractsRepository } from "../../../../../src/modules/contracts/application/contracts.Repository";
import { Contract } from "../../../../../src/modules/contracts/domain/contracts.Entity";

export class ContractsInfrastructureMock implements ContractsRepository {
   findAllContracts = jest.fn(async(): Promise<Contract[]>=> {
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
  })
   findContract = jest.fn(async(id: string): Promise<Contract>=> {
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
  })
   findContractById = jest.fn(async(id: string): Promise<Contract>=> {
    return Contract.toContract({
      id: "id",
      name: "name name",
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
  })
   createContract = jest.fn(async(contract: Contract): Promise<void> =>{})
   editContract = jest.fn(async(contract: Contract): Promise<void> =>{})
   deleteContract = jest.fn(async(id: string): Promise<void>=> {})
}
