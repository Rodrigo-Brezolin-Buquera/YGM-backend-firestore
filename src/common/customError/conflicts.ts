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

export class DoubleCheckin extends CustomError {
    constructor(){
        super(`Checkin já foi realizado`, 403)
    }
}

export class ClosedContractsArray extends CustomError {
    constructor(){
        super("Os contratos encerrados precisam ser um array", 409)
    }
}

export class CheckinsArray extends CustomError {
    constructor(){
        super("Os check-ins precisam ser um array", 409)
    }
}

export class ActiveIsNotBoolean extends CustomError {
    constructor(){
        super("O campo active precisa ser um boolean", 409)
    }
}