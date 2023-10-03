
export interface IIdService {
  generateId(): string;
}


export interface UserCredentials {
  id:string,
  email:string 
}

export interface ITokenService {
   verifyUserPermission(token: string):Promise<UserCredentials | undefined>  
   verifyAdminPermission(token: string): Promise<void> 
}