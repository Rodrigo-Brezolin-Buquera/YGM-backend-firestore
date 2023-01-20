export interface LoginDTO {
    email:string,
    password:string  
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

export interface ResetPasswordOutput {
    email: string,
    resetLink: string
}

