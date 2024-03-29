import { ContractsRepository } from "../business/contracts.Repository";
import { Contract, ContractObject } from "../domain/contract.Entity";
import { BaseDatabase } from "../../../common/database/BaseDatabase";

export class ContractDatabase extends BaseDatabase 
  implements ContractsRepository
{
  collectionName = "contracts";

  public async findAllContracts(): Promise<Contract[]> {
    const planList = await super.findAll();
    return planList.map((plan: ContractObject) => Contract.toModel(plan));
  }

  public async findContract(id: string): Promise<Contract | null> {
    const contract = await super.findById(id);
    return contract ? Contract.toModel({id, ...contract} as ContractObject) : null
  }

  public async createContract(contract: Contract): Promise<void> {
    await super.create(contract, this.toFireStoreContract)
  }

  public async editContract(contract: Contract): Promise<void> {
    await super.edit(contract, this.toFireStoreContract)
  }


  private toFireStoreContract(obj: Contract): object {
    return {
      id:  obj.getId(),
      name:  obj.getName(),
      plan:  obj.getPlan(),
      started:  obj.getStarted(),
      ends:  obj.getEnds(),
      availableClasses: obj.getAvailableClasses()
    };
  }

  public async activeUser(id: string): Promise<void> { 
    await BaseDatabase.firestore.collection("users").doc(id).update({ active: true });
  }
}
