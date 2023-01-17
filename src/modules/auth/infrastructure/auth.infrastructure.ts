import { AuthRepository } from "../application/auth.Repository";
import { User } from "../domain/auth.Entity";
import { BaseInfrastructure } from "../../../config/firebase";
import { AuthFireStoreMapper } from "./auth.Firestore.mapper";
import { LoginOutput, ResetPasswordOutput } from "../domain/auth.DTO";
import { UserAlreadyExist } from "../../../common/customError/conflicts";
import { UserNotFound } from "../../../common/customError/notFound";

export class AuthInfrastructure
  extends BaseInfrastructure
  implements AuthRepository
{
  private userCollection = BaseInfrastructure.admin
    .firestore()
    .collection("users");

  public async login(token: string): Promise<LoginOutput> {
    const tokenData = await BaseInfrastructure.admin
      .auth()
      .verifyIdToken(token);
    const uid = tokenData.user_id;
    const userDoc = await this.userCollection.doc(uid).get();

    return { id: uid, admin: userDoc.data()!.admin };
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
    await BaseInfrastructure.admin.auth().deleteUser(id);
  }
  public async changePassword(id: string): Promise<ResetPasswordOutput> {
    const userSnap = await this.userCollection.doc(id).get();

    if (!userSnap.exists) {
      throw new UserNotFound();
    }

    const { email } = userSnap.data()!;
    const resetLink = await BaseInfrastructure.admin
      .auth()
      .generatePasswordResetLink(email);
    return { email, resetLink };
  }
}
