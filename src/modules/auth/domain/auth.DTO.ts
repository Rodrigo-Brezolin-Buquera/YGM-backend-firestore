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

export interface LoginOutput {
    id: string,
    admin: boolean
}

export interface ResetPasswordOutput {
    email: string,
    resetLink: string
}

export interface LoginTokenOutput {
    customToken: string,
    admin: boolean
}