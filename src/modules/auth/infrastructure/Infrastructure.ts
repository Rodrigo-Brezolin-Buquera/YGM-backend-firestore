import { CustomError } from "../../../common/customError/customError";
import { AuthRepository } from "../application/Repository";
import { Auth } from "../domain/Domain";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { BaseInfrastructure } from "../../../config/firebase";

export class AuthInfrastructure extends BaseInfrastructure implements AuthRepository {
    
    authentication = getAuth();

    public async login(auth: Auth): Promise<string> {
        const userCredential = await signInWithEmailAndPassword(this.authentication, auth.email, auth.password )
        const token = userCredential.user.getIdToken()

       return token
    }
    public async signup(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    
    
}

