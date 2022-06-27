import { CustomError } from "../../../common/customError/customError";
import { ContractsRepository } from "../application/contracts.Repository";
import { Contract } from "../domain/contracts.Entity";
import { ContractsMapper } from "../domain/contracts.mapper";
import { BaseInfrastructure } from "../../../config/firebase";

export class ContractsInfrastructure
  extends BaseInfrastructure
  implements ContractsRepository
{
  private contractCollection = BaseInfrastructure.admin
    .firestore()
    .collection("contracts");

  public async findAllContracts(): Promise<Contract[]> {
    try {
      const contractsSnaphot = await this.contractCollection.get();

      const contractsList = contractsSnaphot.docs.map((doc) => doc.data());
      const result = contractsList.map((contract) =>
        ContractsMapper.toContract(contract)
      );

      return result;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async findContract(id: string): Promise<Contract> {
    try {
      const contractSnap = await this.contractCollection.doc(id).get();

      if (!contractSnap.exists) {
        throw CustomError.contractNotFound();
      }
      return ContractsMapper.toContract(contractSnap.data());
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async findContractById(id: string): Promise<Contract> {
    try {
      const contractSnap = await this.contractCollection.doc(id).get();

      if (!contractSnap.exists) {
        throw CustomError.contractNotFound();
      }
      return ContractsMapper.toContract(contractSnap.data());
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async createContract(contract: Contract): Promise<void> {
    try {
      await this.contractCollection
        .doc(contract.id)
        .set(ContractsMapper.toFireStoreContract(contract));
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async editContract(contract: Contract): Promise<void> {
    try {
      await this.contractCollection
        .doc(contract.id)
        .update(ContractsMapper.toFireStoreContract(contract));
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteContract(id: string): Promise<void> {
    try {
      const docSnap = await this.contractCollection.doc(id).get();

      if (docSnap.exists) {
        await this.contractCollection.doc(id).delete();
      } else {
        throw CustomError.contractNotFound();
      }
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
