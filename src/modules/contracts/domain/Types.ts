export type closedContracts = {
    plan: string,
    ended: string
}

export type currentContract = {
    active: boolean,
    plan: string,  // como garantir que o plano estará correto se ter que chamar o outro dominio?
    started: string,
    ends: string,
    availableClasses: number,
    checkins: checkin[]
}

export type checkin = {
    id: string,
    verified: boolean
}