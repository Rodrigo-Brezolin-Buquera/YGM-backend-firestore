import { ZodIssue } from "zod";

export const zodErrorHandler = (issues: ZodIssue[]): string => {
  let message = "";

  issues.forEach((err) => {
    const field = err.path[0];
    const code = err.code;
    let customMessage = "";

    if (message === "Invalid email") {
      message += "Entre com um email válido\n";
    } else if (code === "too_small" && message.includes("Number must be greater")) {
      customMessage = `deve ser um número maior que${err.minimum} `;
      message += `O campo ${field} ${customMessage}\n`;
    } else if (code === "too_small" && typeof message.includes("String must contain at least")) {
      customMessage = `deve conter pelo menos ${err.minimum} caracteres `;
      message += `O campo ${field} ${customMessage}\n`;
    } else if (code === "too_big" && typeof err.maximum === "number") {
      customMessage = `deve conter no máximo ${err.maximum} caracteres `;
      message += `O campo ${field} ${customMessage}\n`;
    } else {
      message += `${field}: ${err.message}\n`
    }


    // erro de muito grande
    // erros de números

  });

  return message;
};
