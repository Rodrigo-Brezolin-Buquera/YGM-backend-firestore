import { validateName } from "../../../common/domain/common.pattern.name";

export class User {
  constructor(
    private email: string,
    private name?: string,
    private id?: string,
    private admin: boolean = false,
    private active: boolean = false
  ) {
    this.checkName();
  }

  public getId(): string | null {
    return this.id ? this.id : null;
  }

  public getName(): string | null {
    return this.name ? this.name : null;
  }

  public getEmail(): string {
    return this.email;
  }

  public getActive(): boolean {
    return this.active;
  }
  public checkName() {
    if (this.name) {
      validateName(this.name);
    }
  }

  public static toModel(obj:UserObject): User {
    return new User(
      obj.email,
      obj.name,
      obj.id,
      obj.admin,
      obj.active
    );
  }
}

export interface UserObject {
  email: string,
  name?: string,
  id?: string,
  admin?: boolean,
  active?: boolean 
}