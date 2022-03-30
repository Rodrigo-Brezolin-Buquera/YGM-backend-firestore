export type closedContracts = {
    plan: PLAN,
    ended: string
}

export type currentContract = {
    active: boolean,
    plan: PLAN,  
    started: string,
    ends: string,
    availableClasses: number,
    checkins: contractsCheckin[]
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

export type contractsCheckin = {
    id: string,
    verified: boolean,
    date: string
}

export type createContractDTO = {
    email: string,
    name: string ,
    plan: PLAN,
    date: string
}

export type contractIdDTO = {
    id: string,  
}

export type addContractDTO = {
    id: string,
    plan: PLAN,
    date: string
}

export type editContractDTO = {
    id: string,
    name: string,
    plan: PLAN,
    availableClasses: number,
    endDate: string,
    startDate: string,
    active: boolean
}



