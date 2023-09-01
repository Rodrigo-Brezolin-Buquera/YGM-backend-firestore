import { User } from "../domain/auth.Entity"
import { PayloadOutput } from "../domain/DTOs/auth.output.dto"


export interface AuthRepository {
    login(email: string, password:string) : Promise<PayloadOutput>
    signup(email: string, password:string): Promise<PayloadOutput>
    createUser(auth: User) : Promise<void>
    findUser(id:string): Promise<User>
    findInactiveUsers(): Promise<User[]>
    deleteUser(id:string) : Promise<void>
    changePassword(id:string) : Promise<string>
    activeUser(id: string ): Promise<void> 
}