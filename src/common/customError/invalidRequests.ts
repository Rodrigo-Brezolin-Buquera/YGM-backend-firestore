import { CustomError } from "./customError";

export class InvalidRequest extends CustomError {
  constructor() {
    super("Um ou mais campos da requisição estão vazios", 400);
  }
}

export class InvalidDay extends CustomError {
  constructor() {
    super("Dia de aula inválido", 400);
  }
}

export class InvalidInputDate extends CustomError {
  constructor() {
    super("Data inválida para requisição, use o formato YYYY-MM-DD", 406);
  }
}

export class InvalidPlan extends CustomError {
    constructor() {
      super("Plano inválido", 400);
    }
  }

export class InvalidFrequency extends CustomError {
  constructor() {
    super(
      `A frequências das aulas precisa ser: "1x", "2x", "3x" ou "---" `,
      400
    );
  }
}

export class InvalidPlanType extends CustomError {
  constructor() {
    super(
      `O tipo do plano precisa ser: "Mensal", "Trimestral", "Semestral", "Avulsa" ou "Gympass"`,
      400
    );
  }
}

export class InvalidYogaType extends CustomError {
    constructor() {
      super(
        `A aula precisa ser  ser: "Hatha Yoga", "Vinyasa Flow" ou "Yoga Restaurativo"`,
        400
      );
    }
  }


  
  
