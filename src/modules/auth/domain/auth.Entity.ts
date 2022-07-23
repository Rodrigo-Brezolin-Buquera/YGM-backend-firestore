import { CustomError } from "../../../common/customError/customError";
import { InvalidEmail, InvalidName } from "../../../common/customError/invalidRequests";
import { CommonDomain } from "../../../common/domain/CommonDomain";

export class User extends CommonDomain {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name?: string,
    public readonly id?: string
  ) {
    super()
  }

  public checkEmail() {
    try {
      const emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(this.email)) {
        throw new InvalidEmail()
      }
      return this;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode)
    }
  }

  public checkName() {
    try {
      
    if (!this.name) {
      throw new InvalidName()
    }

    if (!this.name.includes(" ")) {
      throw new InvalidName()
    }

    const nameRegex: RegExp =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    if (!nameRegex.test(this.name)) {
      throw new InvalidName()
    }
    if (this.name.length < 5) {
      throw new InvalidName()
    }
    const numberAndSpaceRegex: RegExp = /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/u
    if (!numberAndSpaceRegex.test(this.name)) {
      throw new InvalidName()
    }
    return this;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode)
    }
  }
}
