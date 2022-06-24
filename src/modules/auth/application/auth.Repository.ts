import { User } from "../domain/auth.Entity"


export interface AuthRepository {
    login(auth: string) : Promise<any>
    createUser(auth: User) : Promise<void>
    deleteUser(id:string) : Promise<void>

}