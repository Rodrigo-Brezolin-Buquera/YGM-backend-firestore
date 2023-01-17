import { CustomError } from "./customError";

export class UserNotFound extends CustomError {
    constructor(){
        super("Usuário não encontrado", 404)
    }
}

export class PlanNotFound extends CustomError {
    constructor(){
        super("Plano não encontrado", 404)
    }
}

export class ContractNotFound extends CustomError {
    constructor(){
        super("Contrato não encontrado", 404)
    }
}

export class ClassNotFound extends CustomError {
    constructor(){
        super("Aula não encontrada", 404)
    }
}

export class CheckinNotFound extends CustomError {
    constructor(){
        super("Check-in não encontrado", 404)
    }
}