import { Contract } from "../domain/contracts.Entity";


export interface ContractsRepository {
    findAllContracts() : Promise<Contract[]>
    findContract(): Promise<Contract>
    findContractById(id:string): Promise<Contract> 
    createContract(contract:Contract) : Promise<void>
    editContract(contract:Contract): Promise<void>
    deleteContract(id:string): Promise<void> 

}