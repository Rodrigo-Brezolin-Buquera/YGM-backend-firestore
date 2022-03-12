import { Contract } from "../domain/Domain";


export interface ContractsRepository {
    findAllContracts() : Promise<Contract[]>
    findContract(): Promise<any>
    findContractById(id:string): Promise<Contract> 
    createContract(contract:Contract) : Promise<any>
    editContract(): Promise<any>
    addNewContract(): Promise<any>
    alterPlanStatus(): Promise<any> 
    deleteContract(id:string): Promise<void> 
    toModelContract(obj: any): any 

}