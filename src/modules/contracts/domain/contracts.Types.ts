
export type ClosedContracts = {
    plan: PLAN,
    ended: string
}

export type CurrentContract = {
    active: boolean,
    plan: PLAN,  
    started: string,
    ends: string,
    availableClasses: number | string,
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
    SINGLE = "---Avulsa",
    APP = "---Gympass"
} 

export enum ACTION {
    ADD = "add",
    SUBTRACT = "subtract",
    
} 


export interface Plan {
   id: string,
   type: string,
   frequency: string,
   availableClasses: number,
   durationInMonths: number
}

