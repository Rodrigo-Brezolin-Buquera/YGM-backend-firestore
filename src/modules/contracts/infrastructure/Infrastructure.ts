import { CustomError } from "../../../common/customError/customError";
import { ContractsRepository } from "../application/Repository";
import { Contract } from "../domain/Domain";
import { getAuth, } from "firebase/auth";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore/lite';
import { BaseInfrastructure } from "../../../config/firebase";

export class ContractsInfrastructure extends BaseInfrastructure implements ContractsRepository {

    protected static contractsCollection = collection(BaseInfrastructure.firestore, "contracts")

    protected static adminContracts =  BaseInfrastructure.admin.firestore().collection("contracts")

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

    public async findContract(): Promise<Contract> {
        try {
            
            const uid = getAuth().currentUser.uid
            const contractDoc = doc(ContractsInfrastructure.contractsCollection, uid);
            const docSnap = await getDoc(contractDoc)
            
            if(!docSnap.exists()){
                throw CustomError.contractNotFound()
            } 
            return this.toModelContract(docSnap.data())
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    public async findContractById(id:string): Promise<Contract> {
        try {
            const contractDoc = doc(ContractsInfrastructure.contractsCollection, id);
            const docSnap = await getDoc(contractDoc)
            
            if(!docSnap.exists()){
                throw CustomError.contractNotFound()
            } 
            return this.toModelContract(docSnap.data()) 
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
          
            const contractDoc = doc(ContractsInfrastructure.contractsCollection , contract.id);
            await setDoc(contractDoc, newContract);
 
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

            const contractDoc = doc(ContractsInfrastructure.contractsCollection , contract.id);
            await updateDoc(contractDoc, newContract);
    
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
            const contractDoc = doc(ContractsInfrastructure.contractsCollection, id);
            const docSnap = await getDoc(contractDoc)
            
            if(docSnap.exists()){
                await deleteDoc(contractDoc)
            } else {
                throw CustomError.contractNotFound()
            }         
          } catch (error) {
              throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
          }
    }

    public toModelContract(obj: any): Contract {
        const result = new Contract(obj.id, obj.name, obj.closedContracts, obj.currentContract)
        return result
    }

  

}

