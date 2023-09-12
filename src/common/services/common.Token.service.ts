import * as jwt from "jsonwebtoken";
import {
  InvalidSignature,
  TokenExpired,
  Unauthorized,
} from "../customError/unauthorized";
import dotenv from "dotenv";
import { ITokenService, Payload } from "./common.ports";
import { CustomError } from "../customError/customError";

dotenv.config();



export class TokenService implements ITokenService {

  public generateToken = (payload: Payload ): string => {
    try {
      const token = jwt.sign(payload, process.env.JWT_KEY as string, {
        expiresIn: process.env.JWT_DURATION as string,
      });
  
      return token;
    } catch (error ) {
      throw new CustomError("Error ao gerar o token, tente novamente", 500);
      
    }
  };  

  public  verifyUserPermission = (token: string) => {
    try {
      const payload =  jwt.verify(
        token,
        process.env.JWT_KEY as string
      ) as jwt.JwtPayload;
      return payload.id;
    } catch (error) {
      this.jwtErrorFilter(error as Error);
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
    } catch (error) {
      this.jwtErrorFilter(error as Error);
    }
  };

  private jwtErrorFilter = (error: Error): void => {
    switch (error.message) {
    case "jwt expired":
      throw new TokenExpired();
    case "jwt must be provided":
    case "jwt malformed":
    case "secret or public key must be provided":
      throw new InvalidSignature();
    default:
      throw new Unauthorized();
    }
  };
}

export default TokenService
