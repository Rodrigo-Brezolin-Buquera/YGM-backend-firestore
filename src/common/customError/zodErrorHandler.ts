import { ZodIssue } from "zod";

export const zodErrorHandler = (issues: ZodIssue[]): string => {
  const errorMessages = issues.map((err) => {
    const field = err.path[0];
    const message = err.message;

    return `O Campo ${field} ${message}`;
  });

  return errorMessages.join(""); 
};




