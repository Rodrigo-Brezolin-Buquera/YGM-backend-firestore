import { CustomError } from "./customError";

export class InternalError extends CustomError {
  constructor(){
    super("Erro no servidor, por favor tente novamente", 500)
  }
}