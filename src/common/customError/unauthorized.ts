import { CustomError } from "./customError";

export class Unauthorized extends CustomError {
    constructor(){
        super(`O usuário não tem as permissões necessárias`, 401)
    }
}