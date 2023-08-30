import { User } from "../domain/auth.Entity"
import { LoginOutput, ResetPasswordOutput } from "../domain/DTOs/auth.output.dto"


export interface AuthRepository {
    login(email: string, password:string) : Promise<LoginOutput>
    signup(email: string, password:string): Promise<string>
    createUser(auth: User) : Promise<void>
    findUser(id:string): Promise<User | null>
    findInactiveUsers(): Promise<User[]>
    deleteUser(id:string) : Promise<void>
    changePassword(id:string) : Promise<ResetPasswordOutput>
    activeUser(id: string ): Promise<void> 
}