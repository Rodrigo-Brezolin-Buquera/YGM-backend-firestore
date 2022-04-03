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

  public static invalidDuration(): void {
    throw new CustomError(
      "A duração do plano deve ser maior que zero",
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

  public static invalidFrequency(): void {
    throw new CustomError(`A frequências das aulas precisa ser: "1x", "2x", "3x" ou "---" `, 400);
  }

  public static invalidClassType(): void {
    throw new CustomError(`O tipo do plano precisa ser: "Mensal", "Trimestral", "Semestral", "Avulsa" ou "Gympass"`, 400);
  }

  public static doubleCheckin(): void {
    throw new CustomError(`Checkin já foi realizado`, 403);
  }

 
}
