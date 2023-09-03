import { CustomError } from "./customError";

export class InvalidRequest extends CustomError {
  constructor() {
    super("Um ou mais campos da requisição estão vazios", 400);
  }
}

export class InvalidInputDate extends CustomError {
  constructor() {
    super("Data inválida para requisição, use o formato YYYY-MM-DD", 406);
  }
}






  
  
