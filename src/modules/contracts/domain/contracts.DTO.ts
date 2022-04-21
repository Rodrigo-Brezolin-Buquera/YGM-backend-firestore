import { PLAN } from "./contracts.Types"

export type CreateContractDTO = {
    email: string,
    name: string ,
    plan: PLAN,
    date: string
}

export type ContractIdDTO = {
    id: string,  
}

export type AddContractDTO = {
    id: string,
    plan: PLAN,
    date: string
}

export type EditContractDTO = {
    id: string,
    name: string,
    plan: PLAN,
    availableClasses: number,
    endDate: string,
    startDate: string,
    active: boolean
}