import { CustomError } from "./customError";

export class Unauthorized extends CustomError {
    constructor(){
        super(`O usuário não tem as permissões necessárias`, 403)
    }
}

export class InvalidSignature  extends CustomError {
    constructor(){
        super(`Token inválido, verifique a requisição`, 403)
    }
}

export class TokenExpired  extends CustomError {
    constructor(){
        super(`Token expirado, faça login novamente`, 403)
    }
}