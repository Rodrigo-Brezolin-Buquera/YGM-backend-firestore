import { Auth } from "../domain/Domain"


export interface AuthRepository {
    login(auth: Auth) : Promise<void>
    createUser(auth: Auth) : Promise<void>
    deleteUser(id:string) : Promise<void>

}