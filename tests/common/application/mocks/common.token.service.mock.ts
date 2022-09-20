import { ITokenService } from "../../../../src/common/aplication/common.ports";

export class TokenServiceMock implements ITokenService {
    generateToken= jest.fn((payload: any): string=> {
       return "Token"
    })
    getTokenId = jest.fn((token: string): string => {
        return "ID"
    })
    verifyUserPermission = jest.fn((token: string) => {
       
    })
    verifyAdminPermission= jest.fn((token: string) => {
     
    })
  }
  