import { CustomError } from "../../../common/customError/customError";
import { ContractsRepository } from "../application/contracts.Repository";
import { Contract } from "../domain/contracts.Entity";
import { ContractsMapper } from "../domain/contracts.mapper";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore/lite";
import { BaseInfrastructure } from "../../../config/firebase";

export class ContractsInfrastructure
  extends BaseInfrastructure
  implements ContractsRepository
{

  private contractCollection = BaseInfrastructure.admin
  .firestore()
  .collection("contracts");

  // protected static contractsCollection = collection(
  //   BaseInfrastructure.firestore,
  //   "contracts"
  // );

  public async findAllContracts(): Promise<Contract[]> {
    try {

      const contractsSnaphot = await this.contractCollection.get()

      // const contractsSnaphot = await getDocs(
      //   ContractsInfrastructure.contractsCollection
      // );
      const contractsList = contractsSnaphot.docs.map((doc) => doc.data());
      const result = contractsList.map((contract) =>
      ContractsMapper.toContract(contract)
      );

      return result;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async findContract(): Promise<Contract> {
    try {
      const uid = getAuth().currentUser.uid;

      const contractSnap = await this.contractCollection.doc(uid).get()

      // const contractDoc = doc(ContractsInfrastructure.contractsCollection, uid);
      // const docSnap = await getDoc(contractDoc);

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

      const contractSnap = await this.contractCollection.doc(id).get()
      // const contractDoc = doc(ContractsInfrastructure.contractsCollection, id);
      // const docSnap = await getDoc(contractDoc);

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

      await this.contractCollection.doc(contract.id).set(ContractsMapper.toFireStoreContract(contract))
     
      // const contractDoc = doc(
      //   ContractsInfrastructure.contractsCollection,
      //   contract.id
      // );

      // await setDoc(contractDoc, ContractsMapper.toFireStoreContract(contract));
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async editContract(contract: Contract): Promise<void> {
    try { 

      await this.contractCollection.doc(contract.id).update(ContractsMapper.toFireStoreContract(contract))
      // const contractDoc = doc(
      //   ContractsInfrastructure.contractsCollection,
      //   contract.id
      // );

      // await updateDoc(contractDoc, ContractsMapper.toFireStoreContract(contract));
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
 
  public async deleteContract(id: string): Promise<void> {
    try {
      const docSnap = await this.contractCollection.doc(id).get()
      // const contractDoc = doc(ContractsInfrastructure.contractsCollection, id);
      // const docSnap = await getDoc(contractDoc);

      if (docSnap.exists) {
        await this.contractCollection.doc(id).delete()
      } else {
        throw CustomError.contractNotFound();
      }
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }


}
