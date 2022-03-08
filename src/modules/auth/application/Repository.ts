import { Auth } from "../domain/Domain"


export interface AuthRepository {
    login(auth: Auth) : Promise<string>
    signup() : Promise<any>
   

}