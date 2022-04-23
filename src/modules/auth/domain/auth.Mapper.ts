import { CreateUserDTO, LoginDTO, UserIdDTO } from "./auth.DTO";
import { User } from "./auth.Entity";

export class AuthMapper {


    public static toLoginDTO(req: any): LoginDTO {
        return { 
            email: req.body.email,
            password: req.body.password
        }      
      }

      public static toFireStoreUser(user: User): any {
        return  {
          admin: false,
          email: user.email,
          name: user.name,
          contractId: user.id,
        };     
      }

      public static toFireStoreLogin(user: User): any {
        return  {
          uid: user.id,
          email: user.email,
          password: user.password 
        };     
      }

      public static toCreateUserDTO(req: any): CreateUserDTO {
        return {
            id: req.body.id,
            email: req.body.email,
            name: req.body.name
        }     
      }

    public static toUserIdDTO(req: any): UserIdDTO {
        return { id:  req.params.id }        
      }

}