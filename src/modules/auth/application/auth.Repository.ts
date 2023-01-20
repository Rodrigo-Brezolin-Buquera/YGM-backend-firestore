import { storage } from "firebase-admin"
import {  ResetPasswordOutput } from "../domain/auth.DTO"
import { User } from "../domain/auth.Entity"


export interface AuthRepository {
    login(email: string, password:string) : Promise<string>
    createUser(auth: User) : Promise<void>
    deleteUser(id:string) : Promise<void>
    changePassword(id:string) : Promise<ResetPasswordOutput>
}