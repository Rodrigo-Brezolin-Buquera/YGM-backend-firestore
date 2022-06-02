import { PLAN } from "./contracts.Types"

export interface CreateContractDTO {
    email: string,
    name: string ,
    plan: PLAN,
    date: string
}

export interface ContractIdDTO {
    id: string,  
}

export interface AddContractDTO {
    id: string,
    plan: PLAN,
    date: string
}

export interface EditContractDTO {
    id: string,
    name: string,
    plan: PLAN,
    availableClasses: number,
    endDate: string,
    startDate: string,
    active: boolean
}