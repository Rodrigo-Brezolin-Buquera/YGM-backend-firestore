import { User } from "../domain/auth.Entity"
import { PayloadOutput } from "../domain/DTOs/auth.output.dto"


export interface AuthRepository {
    login(id:string ) : Promise<PayloadOutput>
    deleteAccount(id: string): Promise<void>
    createUser(auth: User) : Promise<void>
    findUser(id:string): Promise<User>
    findInactiveUsers(): Promise<User[]>
    deleteUser(id:string) : Promise<void>
    // activeUser(id: string ): Promise<void> 
}