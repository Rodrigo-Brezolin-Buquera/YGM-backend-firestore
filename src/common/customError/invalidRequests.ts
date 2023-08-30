import { CustomError } from "./customError";

export class InvalidRequest extends CustomError {
  constructor() {
    super("Um ou mais campos da requisição estão vazios", 400);
  }
}

export class InvalidId extends CustomError {
  constructor() {
    super("O id precisa ser uma string válida", 400);
  }
}

export class InvalidTime extends CustomError {
  constructor() {
    super("O horário deve ser no formato: `hh:mm`", 400);
  }
}

export class InvalidDay extends CustomError {
  constructor() {
    super("Dia de aula inválido", 400);
  }
}

export class InvalidTeacher extends CustomError {
  constructor() {
    super("Os professores precisam ser 'Rodrigo' ou 'Louize'", 400);
  }
}

export class InvalidName extends CustomError {
  constructor() {
    super(
      "Nomes não podem caracteres especiais e números", 411);
  }
}

export class InvalidClassQuantity extends CustomError {
  constructor() {
    super("O número de aulas disponíveis deve ser 0 ou maior", 400);
  }
}

export class InvalidClassString extends CustomError {
  constructor() {
    super("O número de aulas para app e avulsas deve ser: --- ", 400);
  }
}

export class InvalidDuration extends CustomError {
  constructor() {
    super("A duração do plano deve ser maior que zero", 400);
  }
}

export class InvalidDate extends CustomError {
  constructor() {
    super("Data inválida, use o formato dd/mm/aaaa", 406);
  }
}

export class InvalidInputDate extends CustomError {
  constructor() {
    super("Data inválida para requisição, use o formato YYYY-MM-DD", 406);
  }
}

export class InvalidEmail extends CustomError {
  constructor() {
    super("Email inválido", 406);
  }
}

export class InvalidPassword extends CustomError {
  constructor() {
    super("Senha inválida", 401);
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

  export class InvalidVerified extends CustomError {
    constructor() {
      super(
        `O campo verified precisa ser true ou false`,
        400
      );
    }
  }

  export class InvalidEntity extends CustomError {
    constructor() {
      super(
        `O parâmetro precisar ser "contract" ou "yogaClass"`,
        400
      );
    }
  }

  export class InvalidAction extends CustomError {
    constructor() {
      super(
        `O parâmetro action precisar ser "add" ou "subtract"`,
        400
      );
    }
  }

  export class InvalidPayment extends CustomError {
    constructor() {
      super(
        `O pagamento mensal precisa seguir o formato: "R$ 00,00"`,
        400
      );
    }
  }

  export class InvalidCapacity extends CustomError {
    constructor() {
      super(
        `A capacidade precisar ser um número maior que zero`,
        400
      );
    }
  }
