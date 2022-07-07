import { CustomError } from "./customError"

export class EmailAlreadyInUse extends CustomError {
    constructor(){
        super("Este email já está cadastrado", 409)
    }
}

export class UserAlreadyExist extends CustomError {
    constructor(){
        super("Usuário já existe", 409)
    }
}

export class IncompatibleDates extends CustomError {
    constructor(){
        super(`A data de encerramento não pode ser antes da de início`, 409)
    }
}