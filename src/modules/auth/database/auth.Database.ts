import { AuthRepository } from "../business/auth.Repository";
import { User } from "../domain/auth.Entity";
import { BaseDatabase } from "../../../common/database/BaseDatabase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {  PayloadOutput} from "../domain/DTOs/auth.output.dto";
import { NotFound } from "../../../common/customError/notFound";

export class AuthDatabase extends BaseDatabase implements AuthRepository {
  collectionName = "users";

  public async login(email: string, password: string): Promise<PayloadOutput> {
    const userCredential = await signInWithEmailAndPassword(
      BaseDatabase.firebaseAuth,
      email,
      password
    );
    // Firebase: Error (auth/user-not-found).
    const { uid } = userCredential.user;

    const user = await super.findById(uid);
    return { id: uid, admin: user!.admin };
  }

  public async signup(email: string, password: string): Promise<PayloadOutput> {
    const { user } = await createUserWithEmailAndPassword(
      BaseDatabase.firebaseAuth,
      email,
      password
    );
    // FirebaseError: Firebase: Error (auth/email-already-in-use)
    return  { id: user.uid, admin: false };
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
    await BaseDatabase.adminAuth.deleteUser(id);
  }

  public async changePassword(email: string): Promise<string> {
    const resetLink = await BaseDatabase.adminAuth.generatePasswordResetLink(
      email
    );
    return resetLink ;
  }

  public async activeUser(id: string): Promise<void> {
    await this.collection().doc(id).update({ active: true });
  }

  private toFireStoreUser(user: User): any {
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
