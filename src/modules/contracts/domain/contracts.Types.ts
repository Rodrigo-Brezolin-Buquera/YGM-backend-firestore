import { Checkin } from "../../booking/domain/booking.Entity"

export type ClosedContracts = {
    plan: PLAN,
    ended: string
}

export type CurrentContract = {
    active: boolean,
    plan: PLAN,  
    started: string,
    ends: string,
    availableClasses: number,
    checkins: Checkin[]
}

export enum PLAN {
    MONTHLYX1 = "1x-Mensal",
    MONTHLYX2 = "2x-Mensal",
    MONTHLYX3 = "3x-Mensal",
    QUARTERLYX1 = "1x-Trimestral",
    QUARTERLYX2 = "2x-Trimestral",
    QUARTERLYX3 = "3x-Trimestral",
    SEMIANNUALX1 = "1x-Semestral",
    SEMIANNUALX2 = "2x-Semestral",
    SEMIANNUALX3 = "3x-Semestral",
    SINGLE = "----Avulsa",
    APP = "----Gympass"
} 


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



