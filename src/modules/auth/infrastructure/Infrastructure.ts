import { CustomError } from "../../../common/customError/customError";
import { AuthRepository } from "../application/Repository";
import { Auth } from "../domain/Domain";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { BaseInfrastructure } from "../../../config/firebase";

export class AuthInfrastructure extends BaseInfrastructure implements AuthRepository {
    
    private authentication = getAuth();

    public async login(auth: Auth): Promise<string> {
        try{
            const userCredential = await signInWithEmailAndPassword(this.authentication, auth.email, auth.password )
            const token = userCredential.user.getIdToken()
    
           return token
        } catch(error){
            throw new CustomError(error.sqlMessage || error.message, error.statusCode || 400)
        }
       
    }
    public async signup(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    
    
}

