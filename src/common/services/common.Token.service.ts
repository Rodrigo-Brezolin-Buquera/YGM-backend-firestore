import {
  InvalidSignature,
  TokenExpired,
  Unauthorized,
} from "../customError/unauthorized";
import { ITokenService,  UserCredentials } from "./common.ports";
import * as admin from "firebase-admin";
import { serviceAccount } from "../database/config";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as object),
});


export class TokenService implements ITokenService {
  private auth = admin.auth();

  private userCol = admin.firestore().collection("users")

  public verifyUserPermission = async (
    token: string
  ): Promise<UserCredentials | undefined> => {
    try {
      const { uid, email } = await this.auth.verifyIdToken(token);
      return { id: uid, email: email! };
    } catch (error) {
      this.jwtErrorFilter(error as Error);
    }
  };

  public verifyAdminPermission = async (token: string): Promise<void> => {
    try {
      const { uid } = await this.auth.verifyIdToken(token);
      const snap = await this.userCol.doc(uid).get()
      const user = snap.data()! 
      
      if (!user.admin) {
        throw new Unauthorized();
      }
    } catch (error) {
      this.jwtErrorFilter(error as Error);
    }
  };

  private jwtErrorFilter = (error: Error): void => {
    switch (error.message) {
      case "id-token-expired":
        throw new TokenExpired();
      case "id-token-revoked":
        throw new InvalidSignature();
      default:
        throw new Unauthorized();
    }
  };
}

export default TokenService;
