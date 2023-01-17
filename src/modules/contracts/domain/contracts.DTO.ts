import { PLAN } from "./contracts.Types"

export interface CreateContractDTO {
    email: string,
    name: string ,
    plan: PLAN,
    date: string,
    token: string
}

export interface ContractIdDTO {
    id: string,
    token: string  
}

export interface AddContractDTO {
    id: string,
    plan: PLAN,
    date: string,
    token: string
}

export interface EditContractDTO {
    id: string,
    name: string,
    plan: PLAN,
    availableClasses: number,
    ends: string,
    started: string,
    active: boolean, 
    token: string
}

export interface ChangeClassesDTO {
    id: string,
    action: string,
    token: string
}

export interface TokenDTO {
    token: string
}

export interface RequestUserDTO {
    id: string, 
    name: string, 
    email: string, 
    token: string
}