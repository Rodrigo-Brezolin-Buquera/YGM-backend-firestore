import { CustomError, PlanNotFound } from "../../../common/customError/customError";
import { ContractsRepository } from "../application/Repository";
import { Contract } from "../domain/Domain";

import {
    getAuth,
    onAuthStateChanged,
  } from "firebase/auth";
import { BaseInfrastructure } from "../../../config/firebase";

export class ContractsInfrastructure extends BaseInfrastructure implements ContractsRepository {

    protected static contractsCollection = BaseInfrastructure.firestore.collection("contracts")

    public async findAllContracts(): Promise<Contract[]> {
        try {    
            const contractsSnaphot = await ContractsInfrastructure.contractsCollection.get()
            const contractsList = contractsSnaphot.docs.map(doc => doc.data());
            const result = contractsList.map((contract)=> this.toModelContract(contract))

            return result
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    public async findContract(): Promise<Contract> {
        try {
                // pegar o id do token


            // // esta errado, fazer usando o admin

            let result
            onAuthStateChanged(getAuth(), (user)=>{
                if (user) { 
                    const id = user.uid;
                    result = this.findContractById(id)
                  } else {
                    throw CustomError.userNotFound()
                  } 
            })

            return result
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    public async findContractById(id:string): Promise<Contract> {
        try {
            const contract = await ContractsInfrastructure.contractsCollection.doc(id).get()
            
            if(!contract.exists){
                throw CustomError.contractNotFound()
            } 
            return this.toModelContract(contract) 
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    public async createContract(contract:Contract): Promise<void> {
        try {
            const newContract = {
              id: contract.id,
              name: contract.name,
              closedContracts: contract.closedContracts,
              currentContract: contract.currentContract
            };
            
            await ContractsInfrastructure.contractsCollection.doc(contract.id).set(newContract)
 
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    public async editContract(contract:Contract): Promise<void> {
        try {     
            const newContract = {
              id: contract.id,
              name: contract.name,
              closedContracts: contract.closedContracts,
              currentContract: contract.currentContract
            };

            await ContractsInfrastructure.contractsCollection.doc(contract.id).update(newContract)
    
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }
    // exatamente igual ao de cima!!!

    // public async addNewContract(contract:Contract): Promise<void> {
    //     try {
    //         const contractDoc = doc(ContractsInfrastructure.contractsCollection , contract.id);

    //         const newContract = {
    //           id: contract.id,
    //           name: contract.name,
    //           closedContracts: contract.closedContracts,
    //           currentContract: contract.currentContract
    //         };
      
    //         await updateDoc(contractDoc, newContract);
     
    //       } catch (error) {
    //           throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
    //       }
    // }

    public async deleteContract(id:string): Promise<void> {
        try {
            const contract = await ContractsInfrastructure.contractsCollection.doc(id).get()
                   
            if(contract.exists){
                await ContractsInfrastructure.contractsCollection.doc(id).delete()
            } else {
                throw CustomError.contractNotFound()
            }          
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    public toModelContract(obj: any): any {
        const result = new Contract(obj.id, obj.name, obj.closedContracts, obj.currentContract)
        return result
    }

  

}

