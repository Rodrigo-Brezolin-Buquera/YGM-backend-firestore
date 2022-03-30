import { CustomError } from "../../../common/customError/customError";

export class Auth {
    constructor(
       public readonly email: string,
       public readonly password: string,
       public readonly name?: string,
       public readonly id?: string,
    ) { }

    public checkEmail() {
    // verificar se é email
      return this
    }

    public checkPassword() {
     
      return this
    }

    public checkId() {
      if(!this.id){
        throw CustomError.invalidRequest()
      }
      return this;
    }

    public checkName() {
      if(!this.name){
        throw CustomError.invalidRequest()
      }
      // testar esse daqui - aparetemente não rolou
      if(!isNaN(parseFloat(this.name))) {
        throw CustomError.invalidName()
      }
      if(this.name.length < 5){
        throw CustomError.invalidName()
      }
      if(!this.name.includes(" ")){
        throw CustomError.invalidName()
      }
      return this;
    }

    }