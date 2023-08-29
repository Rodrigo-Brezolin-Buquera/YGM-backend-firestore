import { AuthRepository } from "../application/auth.Repository";
import { User } from "../domain/auth.Entity";
import { BaseDatabase } from "../../../common/database/BaseDatabase";
import { AuthFireStoreMapper } from "./auth.Firestore.mapper";
import {  LoginOutput, ResetPasswordOutput } from "../domain/auth.DTO";
import { UserAlreadyExist } from "../../../common/customError/conflicts";
import { UserNotFound } from "../../../common/customError/notFound";
import { signInWithEmailAndPassword } from "firebase/auth";

export class AuthInfrastructure
  extends BaseDatabase
  implements AuthRepository
{
  private userCollection = BaseDatabase.admin
    .firestore()
    .collection("users");

  public async login(email: string, password:string): Promise<LoginOutput> {
    const userCredential = await signInWithEmailAndPassword(BaseDatabase.firebaseAuth, email, password)
    const {uid} = userCredential.user
   
    const userDoc = await this.userCollection.doc(uid).get();
    return {id:uid, admin: userDoc.data()!.admin }
  }

  public async createUser(auth: User): Promise<void> {
    const userSnap = await this.userCollection.doc(auth.id!).get();

    if (userSnap.exists) {
      throw new UserAlreadyExist();
    }

    await this.userCollection
      .doc(auth.id!)
      .set(AuthFireStoreMapper.toFireStoreUser(auth));

    await AuthInfrastructure.admin
      .auth()
      .createUser(AuthFireStoreMapper.toFireStoreLogin(auth));
  }

  public async deleteUser(id: string): Promise<void> {
    const userRef = this.userCollection.doc(id);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      throw new UserNotFound();
    }

    await userRef.delete();
    await BaseDatabase.admin.auth().deleteUser(id);
  }
  public async changePassword(id: string): Promise<ResetPasswordOutput> {
    const userSnap = await this.userCollection.doc(id).get();

    if (!userSnap.exists) {
      throw new UserNotFound();
    }

    const { email } = userSnap.data()!;
    const resetLink = await BaseDatabase.admin
      .auth()
      .generatePasswordResetLink(email);
    return { email, resetLink };
  }
}
