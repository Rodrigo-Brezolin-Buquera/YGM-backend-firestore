
export interface IIdService {
  generateId(): string;
}

export interface Payload {
  id: string,
  admin: boolean
}

export interface ITokenService {
   generateToken(payload: Payload ): string 
   verifyUserPermission(token: string): string 
   verifyAdminPermission(token: string): void 
}