export interface LoginDTO {
    token: string,
    
}

export interface CreateUserDTO {
    id: string,
    email: string,
    name: string,
    token: string
}

export interface UserIdDTO {
    id: string,
    token: string
}