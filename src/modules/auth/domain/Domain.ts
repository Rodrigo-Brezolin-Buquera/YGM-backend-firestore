import { CustomError } from "../../../common/customError/customError";

export class Auth {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name?: string,
    public readonly id?: string
  ) {}

  public checkEmail() {
    const emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(this.email)) {
      throw CustomError.invalidEmail();
    }

    return this;
  }

  public checkId() {
    if (!this.id) {
      throw CustomError.invalidRequest();
    }
    return this;
  }

  public checkName() {
    if (!this.name) {
      throw CustomError.invalidRequest();
    }

    const nameRegex: RegExp =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    if (!nameRegex.test(this.name)) {
      throw CustomError.invalidName();
    }
    if (this.name.length < 5) {
      throw CustomError.invalidName();
    }
    if (!this.name.includes(" ")) {
      throw CustomError.invalidName();
    }
    return this;
  }
}
