import { InvalidName} from "../../../common/customError/invalidRequests";

export class User  {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name?: string,
    public readonly id?: string
  ) {
    this.checkName()
  }

  

  public checkName() {
    if (this.name) {
      const nameRegex: RegExp =
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
      if (!nameRegex.test(this.name)) {
        throw new InvalidName();
      }

      const numberAndSpaceRegex: RegExp = /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/u;
      if (!numberAndSpaceRegex.test(this.name)) {
        throw new InvalidName();
      }
    }
  }

  public static toModel(obj: any): User {
    return new User(obj.email, obj.password, obj.name, obj.id);
  }
}
