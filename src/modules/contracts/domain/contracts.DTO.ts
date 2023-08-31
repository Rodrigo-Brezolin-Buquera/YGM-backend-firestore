import { Plan } from "../../../common/domain/common.enum"



export interface AddContractDTO {
    id: string,
    plan: Plan,
    date: string,
    token: string
}

export interface EditContractDTO {
    id: string,
    name: string,
    plan: Plan,
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