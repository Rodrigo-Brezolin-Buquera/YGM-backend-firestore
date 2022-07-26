import { CustomError } from "../../../common/customError/customError";
import { AuthRepository } from "../application/auth.Repository";
import { User } from "../domain/auth.Entity";
import { BaseInfrastructure } from "../../../config/firebase";
import { AuthMapper } from "../domain/auth.Mapper";
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
    try {
      const tokenData = await BaseInfrastructure.admin
        .auth()
        .verifyIdToken(token);
      const uid = tokenData.user_id;
      const userDoc = await this.userCollection.doc(uid).get();

      return { id: uid, admin: userDoc.data().admin };
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }

  public async createUser(auth: User): Promise<void> {
    try {
      const userSnap = await this.userCollection.doc(auth.id).get();

      if (userSnap.exists) {
        throw new UserAlreadyExist();
      }

      await this.userCollection
        .doc(auth.id)
        .set(AuthMapper.toFireStoreUser(auth));

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
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        throw new UserNotFound();
      }

      await userRef.delete();
      await BaseInfrastructure.admin.auth().deleteUser(id);
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
  public async changePassword(id: string): Promise<ResetPasswordOutput> {
    try {
      const userSnap = await this.userCollection.doc(id).get();

      if (!userSnap.exists) {
        throw new UserNotFound();
      }

      const { email } = userSnap.data();
      const resetLink = await BaseInfrastructure.admin
        .auth()
        .generatePasswordResetLink(email);
      return { email, resetLink };
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 400);
    }
  }
}
