export interface CreateClassDTO {
    name: string,
    date: string,
    day: string,
    time: string,
    teacher: string,
    token: string
}

export interface EditClassDTO {
    name: string,
    time: string,
    teacher: string,
    groupId: string,
    changingDate: string,
    token: string
}

export interface DeleteClassesDTO {
    date: string,
    groupId: string,
    token: string
}

export interface ClassIdDTO {
    id: string,
    token: string
}

export interface ClassQueryDTO {
    today: boolean
}