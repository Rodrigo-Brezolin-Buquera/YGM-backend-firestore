import { Contract } from "../domain/contracts.Entity";

export class ContractsFirestoreMapper {
  public static toFireStoreContract(obj: Contract): any {
    return {
      id: obj.id,
      name: obj.name,
      closedContracts: obj.closedContracts,
      currentContract: obj.currentContract,
    };
  }
}
