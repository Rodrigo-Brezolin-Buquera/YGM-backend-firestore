import { AuthRepository } from "../business/auth.Repository";
import { User, UserObject } from "../domain/auth.Entity";
import { BaseDatabase } from "../../../common/database/BaseDatabase";
import {  PayloadOutput} from "../domain/DTOs/auth.output.dto";
import { NotFound } from "../../../common/customError/notFound";

export class AuthDatabase extends BaseDatabase implements AuthRepository {
  collectionName = "users";

  public async login(id: string): Promise<PayloadOutput> {
    const user = await super.findById(id);
    if(!user){
      throw new NotFound("usuário")
    }
    return { id, admin: user!.admin };
  }
    
  public async deleteAccount(id: string): Promise<void> {
    await BaseDatabase.auth.deleteUser(id);
  }
    
  public async createUser(user: User): Promise<void> {
    await super.create(user, this.toFireStoreUser);
  }

  public async findUser(id: string): Promise<User> {
    const user = await super.findById(id);
    if (!user) {
      throw new NotFound("usuário");
    }
    return User.toModel(user as UserObject) 
  }

  public async findInactiveUsers(): Promise<User[]> {
    const snap = await this.collection().where("active", "==", false).get();
    return snap.docs.map((doc) => User.toModel({...doc.data(), id: doc.id} as UserObject));
  }

  public async deleteUser(id: string): Promise<void> {
    await super.delete(id);
    await this.deleteUserContract(id)
    await this.deleteUserCheckins(id)
  }

  public async activeUser(id: string): Promise<void> { 
    await this.collection().doc(id).update({ active: true });
  }

  private toFireStoreUser(user: User): object {
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
