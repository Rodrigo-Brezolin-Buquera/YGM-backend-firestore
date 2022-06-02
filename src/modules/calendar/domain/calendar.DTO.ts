export interface CreateClassDTO {
    name: string,
    date: string,
    day: string,
    time: string,
    teacher: string
}

export interface EditClassDTO {
    name: string,
    time: string,
    teacher: string,
    groupId: string,
    changingDate: string
}

export interface DeleteClassesDTO {
    date: string,
    groupId: string
}

export interface ClassIdDTO {
    id: string
}