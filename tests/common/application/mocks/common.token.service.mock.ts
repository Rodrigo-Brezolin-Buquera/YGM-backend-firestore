import { ITokenService } from "../../../../src/common/aplication/common.ports";

export class TokenServiceMock implements ITokenService {
    generateToken(payload: any): string {
       return "Token"
    }
    getTokenId(token: string): string {
        return "ID"
    }
    verifyUserPermission(token: string): this  {
        return this
    }
    verifyAdminPermission(token: string): this {
       return this
    }
  }
  