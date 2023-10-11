import { ITokenService, UserCredentials } from "../../../../src/common/services/common.ports"

export class TokenServiceMock implements ITokenService {
   
    getTokenId = jest.fn((token: string): string => {
        return "ID"
    })
    verifyUserPermission = jest.fn( async (token: string):Promise<UserCredentials | undefined>  => {
        return {id:"id", email: "email"}}
        )
    verifyAdminPermission= jest.fn( async (token: string): Promise<void> => { })

    

}  