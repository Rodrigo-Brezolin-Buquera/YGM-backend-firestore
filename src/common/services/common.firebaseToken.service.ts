import {
  InvalidSignature,
  TokenExpired,
  Unauthorized,
} from "../customError/unauthorized";
import { ITokenService, Payload, UserCredentials } from "./common.ports";
import { CustomError } from "../customError/customError";
import * as admin from "firebase-admin";
import { serviceAccount } from "../database/config";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as object),
});


export class TokenService implements ITokenService {
  private auth = admin.auth();

  public generateToken = async (payload: Payload): Promise<string> => {
    try {
      const role = payload.admin ? "admin" : "user";
      const token = await this.auth.createCustomToken(payload.id, { role });
      return token;
    } catch (error) {
      throw new CustomError("Error ao gerar o token, tente novamente", 500);
    }
  };

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
      const { role } = await this.auth.verifyIdToken(token);
      if (role !== "admin") {
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
