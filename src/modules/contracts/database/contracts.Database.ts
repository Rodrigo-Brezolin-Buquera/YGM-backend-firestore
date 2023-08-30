import { ContractsRepository } from "../business/contracts.Repository";
import { Contract } from "../domain/contracts.Entity";
import { BaseDatabase } from "../../../common/database/BaseDatabase";

export class ContractDatabase extends BaseDatabase 
implements ContractsRepository
{
  collectionName = "contracts";

  public async findAllContracts(): Promise<Contract[]> {
    const planList = await super.findAll();
    return planList.map((plan: any) => Contract.toModel(plan));
  }

  public async findContract(id: string): Promise<Contract | null> {
    const data = await super.findById(id);
    return data ? Contract.toModel(data) : null;

    // if (!contractSnap.exists) {
    //   throw new ContractNotFound();
    // }
  }

  public async createContract(contract: Contract): Promise<void> {
    await super.create(contract, this.toFireStoreContract)
  }

  public async editContract(contract: Contract): Promise<void> {
    await super.edit(contract, this.toFireStoreContract)
    }

  public async deleteContract(id: string): Promise<void> {
      await super.delete(id)
    // } else {
    //   throw new ContractNotFound();
    // }
  }

  private toFireStoreContract(obj: Contract): any {
    return {
      id: obj.id,
      name: obj.name,
      closedContracts: obj.closedContracts,
      currentContract: obj.currentContract,
    };
  }
}
