import { Auth } from "../domain/Domain"


export interface AuthRepository {
    login(auth: Auth) : Promise<string>
    signup(auth: Auth) : Promise<any>
    deleteUser(id:string) : Promise<void>

}