import { Contract } from "../domain/Domain";


export interface ContractsRepository {
    findAllContracts() : Promise<any>
    findContract(): Promise<any>
    findContractById(): Promise<any> 
    createContract() : Promise<any>
    editContract(): Promise<any>
    addNewContract(): Promise<any>
    alterPlanStatus(): Promise<any> 
    deleteContract(): Promise<any> 
    toModelPan(obj: any): any 

}