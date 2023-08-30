import { validateName } from "../../../common/domain/common.validations";

export class User  {
  constructor(
    private email: string,
    private password: string,
    private name?: string,
    private id?: string,
    private admin: boolean = false,
    private active: boolean = false,
  ) {
    this.checkName()
  }

  public getId(): string | null {
    return this.id ? this.id : null
  }

  public getName(): string | null {
    return this.name ? this.name : null
  }

  public getEmail(): string {
    return this.email 
  }

  public getPassword(): string {
    return this.password 
  }
 
  public checkName() {
    if (this.name) {
      validateName(this.name)
    }
  }

  public static toModel(obj: any): User {
    return new User(obj.email, obj.password, obj.name, obj.id);
  }
}
