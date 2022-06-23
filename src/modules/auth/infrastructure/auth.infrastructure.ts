import { CustomError } from "../../../common/customError/customError";
import { AuthRepository } from "../application/auth.Repository";
import { User } from "../domain/auth.Entity";
import { BaseInfrastructure } from "../../../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore/lite";
import { AuthMapper } from "../domain/auth.Mapper";

export class AuthInfrastructure
  extends BaseInfrastructure
  implements AuthRepository
{
  // protected static userCollection = collection(
  //   BaseInfrastructure.firestore,
  //   "users"
  // );

  private userCollection = BaseInfrastructure.admin
    .firestore()
    .collection("users");

  public async login(token: string): Promise<string> {
    try {
      const tokenData = await BaseInfrastructure.admin
        .auth()
        .verifyIdToken(token);
      const id = tokenData.user_id;
      const userDoc = await this.userCollection.doc(id).get();
      const { admin } = userDoc.data();
      
      const customToken = await BaseInfrastructure.admin
        .auth()
        .createCustomToken(id, { admin });
        console.log("customToken", customToken)
      return customToken;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async createUser(auth: User): Promise<void> {
    try {
      const newUser = AuthMapper.toFireStoreUser(auth);

      const userRef = this.userCollection.doc(auth.id);
      const userSnap = await this.userCollection.get();

      // const docRef = doc(AuthInfrastructure.userCollection, auth.id);
      // const docSnap = await getDoc(docRef);

      if (!userSnap.empty) {
        throw CustomError.userAlreadyExist();
      }
      // apaguei o antigo sem querer
      await this.userCollection.add(userRef);

      await AuthInfrastructure.admin
        .auth()
        .createUser(AuthMapper.toFireStoreLogin(auth));
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {
      const userRef = this.userCollection.doc(id);
      const userSnap = await this.userCollection.get();
      // precisa deletar o auth usando o admin
      // const userDoc = doc(AuthInfrastructure.userCollection, id);
      // const docSnap = await getDoc(userDoc);

      if (userSnap.empty) {
        throw CustomError.userNotFound();
      } else {
        await userRef.delete();
      }
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
