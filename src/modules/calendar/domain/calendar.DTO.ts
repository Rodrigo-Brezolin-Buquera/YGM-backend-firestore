export interface CreateClassDTO {
    name: string,
    date: string,
    day: string,
    time: string,
    teacher: string,
    quantity: number,
    capacity: number,
    token: string
}

export interface EditClassDTO {
    name: string,
    time: string,
    teacher: string,
    groupId: string,
    changingDate: string,
    capacity: number,
    token: string
}

export interface DeleteClassesDTO {
    id: string,
    token: string,
    allClasses: boolean
}

export interface ClassIdDTO {
    id: string,
    token: string
}

export interface ClassQueryDTO {
    today: boolean
}