
import { User } from "../domain/auth.Entity";

export class AuthFireStoreMapper {
  

  public static toFireStoreUser(user: User): any {
    return {
      admin: false,
      email: user.email,
      name: user.name,
      contractId: user.id,
    };
  }

  public static toFireStoreLogin(user: User): any {
    return {
      uid: user.id,
      email: user.email,
      password: user.password,
    };
  }

}