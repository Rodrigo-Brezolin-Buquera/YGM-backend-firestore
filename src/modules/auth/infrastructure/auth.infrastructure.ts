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

  private adminUsers = BaseInfrastructure.admin
    .firestore()
    .collection("users");

    // o login irá acontecer no front, está aqui apenas para teste
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

      const docRef = this.adminUsers.doc(auth.id)
      const docSnap = await this.adminUsers.get()

      // const docRef = doc(AuthInfrastructure.userCollection, auth.id);
      // const docSnap = await getDoc(docRef);

      if (!docSnap.empty) {
        throw CustomError.userAlreadyExist();
      }
      // apaguei o antigo sem querer
      await this.adminUsers.add(docRef)

      await AuthInfrastructure.admin
        .auth()
        .createUser(AuthMapper.toFireStoreLogin(auth));

    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {

      const docRef = this.adminUsers.doc(id)
      const docSnap = await this.adminUsers.get()
      // precisa deletar o auth usando o admin
      // const userDoc = doc(AuthInfrastructure.userCollection, id);
      // const docSnap = await getDoc(userDoc);

      if (docSnap.empty) {
        throw CustomError.userNotFound();
      } else {
        await docRef.delete()  
      }
      
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
