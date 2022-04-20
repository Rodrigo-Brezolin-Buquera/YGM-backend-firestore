
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

export enum ClassName {
    HATHA = "Hatha Yoga",
    VINYASA = "Vinyasa Flow",
    RESTAURATIVE = "Yoga Restaurativo",
}

export type CreateClassDTO = {
    name: string,
    date: string,
    day: string,
    time: string,
    teacher: string
}

export type EditClassDTO = {
    name: string,
    time: string,
    teacher: string,
    groupId: string,
    changingDate: string
}

export type DeleteClassesDTO = {
    date: string,
    groupId: string
}

export type DeleteClassDTO = {
    id: string

}