import {
  InvalidSignature,
  TokenExpired,
  Unauthorized,
} from "../customError/unauthorized";
import dotenv from "dotenv";
import { ITokenService, Payload } from "./common.ports";
import { CustomError } from "../customError/customError";
import * as admin from "firebase-admin";

dotenv.config();

export class FirebaseTokenService {
//  implements ITokenService
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

  public verifyUserPermission = async (token: string): Promise<string|undefined>  => {
    try {
      const {uid} = await this.auth.verifyIdToken(token);
      return uid
    } catch (error) {
      this.jwtErrorFilter(error as Error);
    }
  };

  public verifyAdminPermission = async(token: string):Promise<void> => {
    try {
      const {role} = await this.auth.verifyIdToken(token);
      if (role !== "admin") {
        throw new Unauthorized();
      }
    } catch (error) {
      this.jwtErrorFilter(error as Error);
    }
  };

  private jwtErrorFilter = (error: Error): void => {
    // mudar isso!
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

export default FirebaseTokenService;
