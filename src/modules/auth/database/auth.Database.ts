import { AuthRepository } from "../business/auth.Repository";
import { User } from "../domain/auth.Entity";
import { BaseDatabase } from "../../../common/database/BaseDatabase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  LoginOutput,
  ResetPasswordOutput,
} from "../domain/DTOs/auth.output.dto";

export class AuthDatabase extends BaseDatabase implements AuthRepository {
  collectionName = "users";

  public async login(email: string, password: string): Promise<LoginOutput> {
    const userCredential = await signInWithEmailAndPassword(
      BaseDatabase.firebaseAuth,
      email,
      password
    );
    const { uid } = userCredential.user;

    const user = await super.findById(uid);
    return { id: uid, admin: user!.admin };
  }

  public async signup(email: string, password: string): Promise<string> {
    const { user } = await createUserWithEmailAndPassword(
      BaseDatabase.firebaseAuth,
      email,
      password
    );
    // erro caso já exista
    return user.uid;
  }

  public async createUser(user: User): Promise<void> {
    await super.create(user, this.toFireStoreUser);
  }

  public async findUser(id: string): Promise<User | null> {
    const data = await super.findById(id);
    return data ? User.toModel(data) : null;
  }

  public async findInactiveUsers(): Promise<any> {
    const snap = await this.collection().where("active", "==", false).get()
    return snap.docs.map((doc) => User.toModel(doc.data()));
  }

  public async deleteUser(id: string): Promise<void> {
    await super.delete(id);
    await BaseDatabase.adminAuth.deleteUser(id);
  }

  public async changePassword(email: string): Promise<ResetPasswordOutput> {
    const resetLink = await BaseDatabase.adminAuth.generatePasswordResetLink(
      email
    );
    return { email, resetLink };
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
}
