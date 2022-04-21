import { CustomError } from "../../../common/customError/customError";
import { AuthRepository } from "../application/Auth.Repository";
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

      const userDoc = await AuthInfrastructure.adminUsers.doc(user.uid).get();

      if (!userDoc.exists) {
        throw CustomError.userNotFound;
      }
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
  public async createUser(auth: User): Promise<void> {
    try {

      // isso não deveri estar aqui e sim na camada application - aqui apenas o mapper
      const newUser = {
        admin: false,
        email: auth.email,
        name: auth.name,
        contractId: auth.id,
      };

      const docRef = doc(AuthInfrastructure.userCollection, auth.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        throw CustomError.userAlreadyExist()
      }

      await setDoc(docRef, newUser);

      await AuthInfrastructure.admin.auth().createUser({
        uid: auth.id,
        email: auth.email,
        password: auth.password,
      });
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {
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
