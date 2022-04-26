
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

export interface Checkin {
  id: string,
  verified: boolean,
  name: string,
  date: string
}