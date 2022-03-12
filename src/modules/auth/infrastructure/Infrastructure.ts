import { CustomError } from "../../../common/customError/customError";
import { AuthRepository } from "../application/Repository";
import { Auth } from "../domain/Domain";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore/lite";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { BaseInfrastructure } from "../../../config/firebase";

// regra do firestore que atualmente não funciona: get(/databases/{database}/documents/users/$(request.auth.uid)).data.admin

export class AuthInfrastructure
  extends BaseInfrastructure
  implements AuthRepository
{

  protected static userCollection = collection(
    BaseInfrastructure.firestore,
    "users"
  );

  public async login(auth: Auth): Promise<string> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        auth.email,
        auth.password
      );
      const token = userCredential.user.getIdToken();

      return token;
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
  public async signup(auth: Auth): Promise<any> {
    try {
      await createUserWithEmailAndPassword(
        getAuth(),
        auth.email,
        auth.password
      );
        
      const userDoc = doc(AuthInfrastructure.userCollection, auth.id);
      const docSnap = await getDoc(userDoc)

      if(docSnap.exists() ) {
        throw CustomError.usedEmail()
      }

      const newUser = {
        admin: false,
        email: auth.email,
        name: auth.name,
        contractId: auth.id,
      };

      await setDoc(userDoc, newUser);
      
    } catch (error) {
      throw new CustomError(
        error.sqlMessage || error.message,
        error.statusCode || 400
      );
    }
  }
}
