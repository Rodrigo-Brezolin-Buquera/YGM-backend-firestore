import { Contract } from "../domain/Domain";


export interface ContractsRepository {
    findAllContracts() : Promise<Contract[]>
    findContract(): Promise<any>
    findContractById(): Promise<any> 
    createContract(contract:Contract) : Promise<any>
    editContract(): Promise<any>
    addNewContract(): Promise<any>
    alterPlanStatus(): Promise<any> 
    deleteContract(): Promise<any> 
    toModelContract(obj: any): any 

}