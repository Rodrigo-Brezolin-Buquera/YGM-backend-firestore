import { ContractsRepository } from "../business/contracts.Repository";
import { Contract } from "../domain/contract.Entity";
import { BaseDatabase } from "../../../common/database/BaseDatabase";
import { ContractNotFound } from "../../../common/customError/notFound";

export class ContractDatabase extends BaseDatabase 
    implements ContractsRepository
{
    collectionName = "contracts";

    public async findAllContracts(): Promise<Contract[]> {
        const planList = await super.findAll();
        return planList.map((plan: any) => Contract.toModel(plan));
    }

    public async findContract(id: string): Promise<Contract> {
        const contract = await super.findById(id);
        return Contract.toModel(contract)
    }

    public async createContract(contract: Contract): Promise<void> {
        await super.create(contract, this.toFireStoreContract)
    }

    public async editContract(contract: Contract): Promise<void> {
        await super.edit(contract, this.toFireStoreContract)
    }

    private toFireStoreContract(obj: Contract): any {
        return {
            id:  obj.getId(),
            name:  obj.getName(),
            plan:  obj.getPlan(),
            started:  obj.getStarted(),
            ends:  obj.getEnds(),
            availableClasses: obj.getAvailableClasses()
        };
    }
}
