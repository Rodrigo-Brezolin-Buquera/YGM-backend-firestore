import { User } from "../domain/auth.Entity"
import { PayloadOutput, TokenOutput } from "../domain/DTOs/auth.output.dto"


export interface AuthRepository {
    login(token:string ) : Promise<PayloadOutput>
    verifyToken(token: string): Promise<TokenOutput>
    deleteAccount(id: string): Promise<void>
    createUser(auth: User) : Promise<void>
    findUser(id:string): Promise<User>
    findInactiveUsers(): Promise<User[]>
    deleteUser(id:string) : Promise<void>
    changePassword(id:string) : Promise<string>
    activeUser(id: string ): Promise<void> 
}