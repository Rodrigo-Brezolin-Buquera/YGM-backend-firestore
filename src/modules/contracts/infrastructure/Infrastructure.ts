import { CustomError, PlanNotFound } from "../../../common/customError/customError";
import { ContractsRepository } from "../application/Repository";
import { Contract } from "../domain/Domain";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore/lite';
import { BaseInfrastructure } from "../../../config/firebase";

export class ContractsInfrastructure extends BaseInfrastructure implements ContractsRepository {
    protected static contractsCollection = collection(BaseInfrastructure.firestore, "contracts")

    public async findAllContracts(): Promise<any> {
        try {
            console.log("infra")
            const contractsSnaphot =  await getDocs(ContractsInfrastructure.contractsCollection);
            const contractsList = contractsSnaphot.docs.map(doc => doc.data());
            
            contractsList.forEach((contract)=> this.toModelContract(contract))

            return contractsList
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

    public async createContract(): Promise<any> {
        try {
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

