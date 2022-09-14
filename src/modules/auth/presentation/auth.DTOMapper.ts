import { CreateUserDTO, LoginDTO, UserIdDTO } from "../domain/auth.DTO";

export class AuthDTOMapper {
  
  public static toLoginDTO(req: any): LoginDTO {
    return {
      token: req.body.token,
    };
  }

  public static toCreateUserDTO(req: any): CreateUserDTO {
    return {
      id: req.body.id?.trim(),
      email: req.body.email?.trim(),
      name: req.body.name?.trim(),
      token: req.headers.authorization!,
    };
  }

  public static toUserIdDTO(req: any): UserIdDTO {
    return {
      id: req.params.id,
      token: req.headers.authorization!,
    };
  }

  public static toDeleteUserDTO(req: any): UserIdDTO {
    return {
      id: req.params.id,
      token: req.headers.authorization!,
    };
  }
}  