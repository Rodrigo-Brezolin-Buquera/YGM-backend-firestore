import { ContractsRepository } from "../application/contracts.Repository";
import { Contract } from "../domain/contracts.Entity";
import { ContractsFirestoreMapper } from "./contracts.FireStore.mapper";
import { BaseInfrastructure } from "../../../config/firebase";
import { ContractNotFound } from "../../../common/customError/notFound";

export class ContractsInfrastructure
  extends BaseInfrastructure
  implements ContractsRepository
{
  private contractCollection = BaseInfrastructure.admin
    .firestore()
    .collection("contracts");

  public async findAllContracts(): Promise<Contract[]> {
    const contractsSnaphot = await this.contractCollection.get();

    const contractsList = contractsSnaphot.docs.map((doc) => doc.data());
    const result = contractsList.map((contract) =>
      Contract.toContract(contract)
    );

    return result;
  }

  public async findContract(id: string): Promise<Contract> {
    const contractSnap = await this.contractCollection.doc(id).get();

    if (!contractSnap.exists) {
      throw new ContractNotFound();
    }
    return Contract.toContract(contractSnap.data());
  }

  public async findContractById(id: string): Promise<Contract> {
    const contractSnap = await this.contractCollection.doc(id).get();

    if (!contractSnap.exists) {
      throw new ContractNotFound();
    }
    return Contract.toContract(contractSnap.data());
  }

  public async createContract(contract: Contract): Promise<void> {
    await this.contractCollection
      .doc(contract.id)
      .set(ContractsFirestoreMapper.toFireStoreContract(contract));
  }

  public async editContract(contract: Contract): Promise<void> {
    await this.contractCollection
      .doc(contract.id)
      .update(ContractsFirestoreMapper.toFireStoreContract(contract));
  }

  public async deleteContract(id: string): Promise<void> {
    const docSnap = await this.contractCollection.doc(id).get();

    if (docSnap.exists) {
      await this.contractCollection.doc(id).delete();
    } else {
      throw new ContractNotFound();
    }
  }

 
}
