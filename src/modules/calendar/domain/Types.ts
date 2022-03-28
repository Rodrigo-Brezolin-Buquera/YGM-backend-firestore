
export type CalendarCheckin = {
    id: string,
    verified: boolean,
    name: string,
    date: string
}


export enum Day {
    MON = "Segunda",
    TUE = "Terça",
    WED = "Quarta",
    THU = "Quinta",
    FRI = "Sexta",
    SAT = "Sábado"
}

export enum Teacher {
    LOUIZE = "Louize",
    RODRIGO = "Rodrigo",
}

export enum name {
    HATHA = "Hatha Yoga",
    VINYASA = "Vinyasa Flow",
    RESTAURATIVE = "Yoga Restaurativo",
}



export type createClassDTO = {
    name: string,
    date: string,
    day: string,
    time: string,
    teacher: string
}