import { CustomError } from "../../../common/customError/customError";
import { AuthRepository } from "../application/auth.Repository";
import { User } from "../domain/auth.Entity";
import { BaseInfrastructure } from "../../../config/firebase";
import { AuthMapper } from "../domain/auth.Mapper";
import { LoginOutput } from "../domain/auth.DTO";

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
      const newUser = AuthMapper.toFireStoreUser(auth);

      const userRef = this.userCollection.doc(auth.id);
      const userSnap = await this.userCollection.get();

      if (!userSnap.empty) {
        throw CustomError.userAlreadyExist();
      }

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
