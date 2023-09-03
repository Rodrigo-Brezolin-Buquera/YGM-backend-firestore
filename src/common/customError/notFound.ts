import { CustomError } from "./customError";


export class NotFound extends CustomError {
  constructor(public entity:string = "item"){
    super(`Não foi possível encontrar o(a) ${entity}`, 404)
  }
}





export class FirmNotFound extends CustomError {
  constructor(){
    super("Dados não encontrados", 404)
  }
}

