

export interface ResetPasswordOutput {
    email: string,
    resetLink: string
}

export interface LoginOutput {
    id: string,
    admin: boolean
}
