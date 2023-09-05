import { AuthRepository } from "../business/auth.Repository";
import { User } from "../domain/auth.Entity";
import { BaseDatabase } from "../../../common/database/BaseDatabase";
import {  PayloadOutput, TokenOutput} from "../domain/DTOs/auth.output.dto";
import { NotFound } from "../../../common/customError/notFound";

export class AuthDatabase extends BaseDatabase implements AuthRepository {
  collectionName = "users";

  public async login(token: string): Promise<PayloadOutput> {
    const { uid } =  await this.verifyToken(token)
      const user = await super.findById(uid);
      if(!user){
        throw new NotFound("usuário")
      }
      return { id: uid, admin: user!.admin };
  }

  public async verifyToken(token: string): Promise<TokenOutput> { 
    const {uid, email} =  await BaseDatabase.auth.verifyIdToken(token)
    return {uid, email: email!}
  }

  public async createUser(user: User): Promise<void> {
    await super.create(user, this.toFireStoreUser);
  }

  public async findUser(id: string): Promise<User> {
    const user = await super.findById(id);
    if (!user) {
      throw new NotFound("usuário");
    }
    return User.toModel(user) 
  }

  public async findInactiveUsers(): Promise<any> {
    const snap = await this.collection().where("active", "==", false).get();
    return snap.docs.map((doc) => User.toModel(doc.data()));
  }

  public async deleteUser(id: string): Promise<void> {
    await super.delete(id);
    await this.deleteUserContract(id)
    await this.deleteUserCheckins(id)
    await BaseDatabase.auth.deleteUser(id);
  }

  public async changePassword(email: string): Promise<string> {
    const resetLink = await BaseDatabase.auth.generatePasswordResetLink(
      email
    );
    return resetLink ;
  }

  public async activeUser(id: string): Promise<void> {
    await this.collection().doc(id).update({ active: true });
  }

  private toFireStoreUser(user: User): Object {
    return {
      admin: false,
      active: false,
      email: user.getEmail(),
      name: user.getName(),
    };
  }

  private async deleteUserContract(id: string): Promise<void> {
    // tentar transformar em cloud function
    await BaseDatabase.firestore.collection("contracts").doc(id).delete();
  }
  private async deleteUserCheckins(id: string): Promise<void> {
    // tentar transformar em cloud function
    await BaseDatabase.firestore
      .collection("checkins")
      .where("contractId", "==", id)
      .get()
      .then((snap) => {
        snap.forEach((doc) => doc.ref.delete());
      });
  }
}
