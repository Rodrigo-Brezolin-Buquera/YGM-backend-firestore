import { CreateUserDTO, LoginDTO, UserIdDTO } from "./auth.DTO";
import { User } from "./auth.Entity";

export class AuthMapper {
  public static toUser(obj: any): User {
    return new User(obj.email, obj.password, obj.name, obj.id);
  }

  public static toLoginDTO(req: any): LoginDTO {
    return {
      token: req.body.token,
    };
  }

  public static toFireStoreUser(user: User): any {
    return {
      admin: false,
      email: user.email,
      name: user.name,
      contractId: user.id,
    };
  }

  public static toFireStoreLogin(user: User): any {
    return {
      uid: user.id,
      email: user.email,
      password: user.password,
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
