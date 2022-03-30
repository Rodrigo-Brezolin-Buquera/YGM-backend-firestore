export class CustomError extends Error {
  constructor(message: any, public readonly statusCode: number = 400) {
    super(message);
  }

  public static usedEmail(): void {
    throw new CustomError("Já existe usuário com este email", 409);
  }

  public static contractNotFound(): void {
    throw new CustomError("Contrato não encontrado", 404);
  }

  public static userNotFound(): void {
    throw new CustomError("Usuário não encontrado", 404);
  }

  public static invalidRequest(): void {
    throw new CustomError("Os campos da requisição estão incorretos", 404);
  }

  public static invalidTime(): void {
    throw new CustomError("O horário deve ser no formato: `hh:mm`", 400);
  }

  public static invalidDay(): void {
    throw new CustomError("Dia de aula inválido", 400);
  }

  public static invalidTeacher(): void {
    throw new CustomError(
      "Os professores precisam ser 'Rodrigo' ou 'Louize'",
      400
    );
  }

  public static invalidName(): void {
    throw new CustomError(
      "Nomes precisam de pelo menos 5 caracteres, um nome e sobrenome e não incluir números",
      411
    );
  }

  public static invalidClassQuantity(): void {
    throw new CustomError(
      "O número de aulas disponíveis deve ser 0 ou maior",
      400
    );
  }

  public static planNotFound(): void {
    throw new CustomError("Plano não encontrado", 404);
  }

  public static classNotFound(): void {
    throw new CustomError("Aula não encontrada", 404);
  }

  public static invalidDate(): void {
    throw new CustomError("Data inválida, use o formato dd/mm/aaaa", 406);
  }

  public static invalidEmail(): void {
    throw new CustomError("Email inválido", 406);
  }

  public static invalidPassword(): void {
    throw new CustomError("Senha inválida", 401);
  }
}

export class AuthenticationMissing extends CustomError {
  constructor() {
    super("Token authentication necessary", 401);
  }
}

export class Unauthorized extends CustomError {
  constructor() {
    super("Unauthorized user", 401);
  }
}

export class Forbiden extends CustomError {
  constructor() {
    super("Forbiden action", 403);
  }
}

export class InvalidCode extends CustomError {
  constructor() {
    super("Invalid validation code", 401);
  }
}

export class EmptyObject extends CustomError {
  constructor() {
    super("An object have empty fields", 422);
  }
}

export class PasswordLength extends CustomError {
  constructor() {
    super("The password must have 5 to 10 characters", 411);
  }
}

export class TypeError extends CustomError {
  constructor() {
    super(
      `Type must be one of the following: "Mensal", "Trimestral", "Semestral", "Avulsa" ou "Gympass"`,
      400
    );
  }
}

export class FrequencyError extends CustomError {
  constructor() {
    super(
      `Frequency must be one of the following: "1X", "2X", "3X" ou "---" `,
      400
    );
  }
}

export class ClassesLogic extends CustomError {
  constructor() {
    super("Total classes must be bigger than the avaliable", 409);
  }
}

export class DatesLogic extends CustomError {
  constructor() {
    super("The starting date must be before the ending date", 409);
  }
}
