import { ITokenService } from "../../../../src/common/services/common.ports"

export class TokenServiceMock implements ITokenService {
    generateToken= jest.fn((payload: any): string=> {
       return "Token"
    })
    getTokenId = jest.fn((token: string): string => {
        return "ID"
    })
    verifyUserPermission = jest.fn((token: string):string => "id")
    verifyAdminPermission= jest.fn((token: string) => { })

}  