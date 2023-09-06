import { Contract } from "../domain/contract.Entity";


export interface ContractsRepository {
    findAllContracts() : Promise<Contract[]>
    findContract(id: string): Promise<Contract | null>
    createContract(contract:Contract) : Promise<void>
    editContract(contract:Contract): Promise<void>
 
}