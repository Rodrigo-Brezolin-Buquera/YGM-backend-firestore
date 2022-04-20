import { User } from "../domain/auth.Entity"


export interface AuthRepository {
    login(auth: User) : Promise<void>
    createUser(auth: User) : Promise<void>
    deleteUser(id:string) : Promise<void>

}