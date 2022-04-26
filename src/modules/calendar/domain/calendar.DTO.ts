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

export type ClassIdDTO = {
    id: string
}