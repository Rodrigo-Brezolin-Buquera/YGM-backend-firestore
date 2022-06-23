import { User } from "../domain/auth.Entity"


export interface AuthRepository {
    login(auth: string) : Promise<string>
    createUser(auth: User) : Promise<void>
    deleteUser(id:string) : Promise<void>

}