import * as jwt from "jsonwebtoken";
import {
  InvalidSignature,
  TokenExpired,
  Unauthorized,
} from "../customError/unauthorized";
import dotenv from "dotenv";
import { ITokenService } from "./common.ports";
dotenv.config();

export interface Payload {
  id: string,
  admin: boolean
}

export class TokenService implements ITokenService {

  public generateToken = (payload: Payload ): string => {
    try {
      const token = jwt.sign(payload, process.env.JWT_KEY as string, {
        expiresIn: process.env.JWT_DURATION as string,
      });
  
      return token;
    } catch (error: any) {
      console.log(error);
      throw new Unauthorized();
      // fazer tratamento melhor desse erro
    }
  };  

  public  getTokenId = (token: string): string => {
    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_KEY as string
      ) as jwt.JwtPayload;
      return payload.id;
    } catch (error: any) {
      console.log(error);
      throw new Unauthorized();
      // fazer tratamento melhor desse erro
    }
  };

  public  verifyUserPermission = (token: string) => {
    try {
      jwt.verify(
        token,
        process.env.JWT_KEY as string
      ) as jwt.JwtPayload;

      return this;
    } catch (error: any) {
      this.jwtErrorFilter(error);
    }
  };

  public  verifyAdminPermission = (token: string) => {
    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_KEY as string
      ) as jwt.JwtPayload;
      const admin = payload.admin;

      if (!admin) {
        throw new Unauthorized();
      }
      return this;
    } catch (error: any) {
      this.jwtErrorFilter(error);
    }
  };

  private  jwtErrorFilter = (error: any): void => {
    if (error.message === "jwt expired") {
      throw new TokenExpired();
    }

    if (error.message === "jwt must be provided") {
      throw new InvalidSignature();
    }

    if (error.message === "jwt malformed") {
      throw new InvalidSignature();
    }

    if (error.message === "secret or public key must be provided") {
      throw new InvalidSignature();
    }

    throw new Unauthorized();
  };
}

export default TokenService