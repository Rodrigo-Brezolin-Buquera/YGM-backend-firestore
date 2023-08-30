import { Contract } from "../domain/contracts.Entity";


export interface ContractsRepository {
    findAllContracts() : Promise<Contract[]>
    findContract(id: string): Promise<Contract | null>
    createContract(contract:Contract) : Promise<void>
    editContract(contract:Contract): Promise<void>
    deleteContract(id:string): Promise<void> 
 
}