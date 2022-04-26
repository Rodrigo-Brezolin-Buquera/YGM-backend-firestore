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
  protected static userCollection = collection(
    BaseInfrastructure.firestore,
    "users"
  );

  protected static adminUsers = BaseInfrastructure.admin
    .firestore()
    .collection("users");

  public async login(auth: User): Promise<void> {
    try {
      const { user } = await signInWithEmailAndPassword(
        getAuth(),
        auth.email,
        auth.password
      );
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
  public async createUser(auth: User): Promise<void> {
    try {
      const newUser = AuthMapper.toFireStoreUser(auth);

      const docRef = doc(AuthInfrastructure.userCollection, auth.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        throw CustomError.userAlreadyExist();
      }

      await setDoc(docRef, newUser);

      await AuthInfrastructure.admin
        .auth()
        .createUser(AuthMapper.toFireStoreLogin(auth));
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {
      // precisa deletar o auth usando o admin
      const userDoc = doc(AuthInfrastructure.userCollection, id);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        await deleteDoc(userDoc);
      } else {
        throw CustomError.userNotFound();
      }
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
