
export interface IIdService {
  generateId(): string;
}

export interface Payload {
  id: string,
  admin: boolean
}

export interface UserCredentials {
  id:string,
  email:string 
}

export interface ITokenService {
   generateToken(payload: Payload ): Promise<string>  
   verifyUserPermission(token: string):Promise<UserCredentials | undefined>  
   verifyAdminPermission(token: string): Promise<void> 
}