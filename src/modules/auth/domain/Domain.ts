import { InvalidName, InvalidRequest } from "../../../common/customError/customError";

export class Auth {
    constructor(
       public readonly email: string,
       public readonly password: string,
       public readonly id?: string,
       public readonly name?: string,

    
    ) { }

    public checkEmail(email: string) {
    // verificar se é email
      return this
    }

    public checkPassword(password: string) {
     
      return this
    }

    public checkId(id:string) {
      if(!id){
        throw new InvalidRequest
      }
      return this;
    }

    public checkName(name:string) {
      if(!name){
        throw new InvalidRequest
      }
      // testar esse daqui
      if(!isNaN(parseFloat(name))) {
        throw new InvalidName
      }
      if(name.length < 5){
        throw new InvalidName
      }
      if(!name.includes(" ")){
        throw new InvalidName
      }
      return this;
    }

    }