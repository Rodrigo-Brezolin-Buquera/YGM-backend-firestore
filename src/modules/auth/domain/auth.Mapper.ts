import { CreateUserDTO, LoginDTO, UserIdDTO } from "./auth.DTO";
import { User } from "./auth.Entity";

export class AuthMapper {


    public static toModelLoginDTO(req: any): LoginDTO {
        return { 
            email: req.body.email,
            password: req.body.password
        }      
      }

      public static toModelCreateUserDTO(req: any): CreateUserDTO {
        return {
            id: req.body.id,
            email: req.body.email,
            name: req.body.name
        }     
      }

    public static toModelUserIdDTO(req: any): UserIdDTO {
        return { id:  req.params.id }        
      }

}