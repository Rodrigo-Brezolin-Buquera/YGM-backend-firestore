import { AuthRepository } from "../business/auth.Repository";
import { User } from "../domain/auth.Entity";
import { BaseDatabase } from "../../../common/database/BaseDatabase";
import { UserAlreadyExist } from "../../../common/customError/conflicts";
import { UserNotFound } from "../../../common/customError/notFound";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  LoginOutput,
  ResetPasswordOutput,
} from "../domain/DTOs/auth.output.dto";
import { SignupDTO } from "../domain/DTOs/auth.signup.dto";

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

  public async deleteUser(id: string): Promise<void> {
    const userDB = await super.findById(id);

    if (!userDB) {
      throw new UserNotFound();
    }

    await super.delete(id);
    await BaseDatabase.adminAuth.deleteUser(id);
  }

  public async changePassword(id: string): Promise<ResetPasswordOutput> {
    const user = await super.findById(id);

    if (!user) {
      throw new UserNotFound();
    }

    const { email } = user;
    const resetLink = await BaseDatabase.adminAuth.generatePasswordResetLink(
      email
    );
    return { email, resetLink };
  }

  private toFireStoreUser(user: User): any {
    return {
      admin: false,
      active: false,
      email: user.email,
      name: user.name,
    };
  }
}
