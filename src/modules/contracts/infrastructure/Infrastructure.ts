import { CustomError, PlanNotFound } from "../../../common/customError/customError";
import { ContractsRepository } from "../application/Repository";
import { Contract } from "../domain/Domain";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore/lite';
import { BaseInfrastructure } from "../../../config/firebase";

export class ContractsInfrastructure extends BaseInfrastructure implements ContractsRepository {

    protected static contractsCollection = collection(BaseInfrastructure.firestore, "contracts")

    public async findAllContracts(): Promise<Contract[]> {
        try {    
            const contractsSnaphot =  await getDocs(ContractsInfrastructure.contractsCollection);
            const contractsList = contractsSnaphot.docs.map(doc => doc.data());
            const result = contractsList.map((contract)=> this.toModelContract(contract))

            return result
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    public async findContract(): Promise<any> {
        try {
            return
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    public async findContractById(): Promise<any> {
        try {
            return
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    public async createContract(contract:Contract): Promise<any> {
        try {

            const contractDoc = doc(ContractsInfrastructure.contractsCollection , contract.id);

            const newContract = {
              id: contract.id,
              name: contract.name,
              closedContracts: contract.closedContracts,
              currentContract: contract.currentContract
            };
      
            await setDoc(contractDoc, newContract);
            
            return
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    public async editContract(): Promise<any> {
        try {
            return
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    public async addNewContract(): Promise<any> {
        try {
            return
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    public async  alterPlanStatus(): Promise<any> {
        try {
            return
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    public async deleteContract(): Promise<any> {
        try {
            return
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    public toModelContract(obj: any): any {
        const result = new Contract(obj.id, obj.name, obj.closedContracts, obj.currentContract)
        return result
    }

  

}

