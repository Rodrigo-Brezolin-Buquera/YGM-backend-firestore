import { z } from "zod";

export const zodString = z
  .string({ invalid_type_error: "deve ser uma string", required_error: "é obrigatório" })
  .min(1, { message: "deve ter pelo menos 1 caracter" })
  .trim();

export const zodNumber = z
  .number({ invalid_type_error: "deve ser um número", required_error: "é obrigatório" })
  .int({ message: "deve ser um número inteiro" });

export const zodNumberGT0 = zodNumber.gt(0, { message: "deve ser maior do que 0"});

export const zodOptionalString = zodString.optional();

export const zodMonths = zodNumber
  .gte(0, { message: "deve ser maior ou igual a 0" })
  .lte(12, { message: "deve ser menor ou igual a doze" });

export const zodClasses = zodNumberGT0.lt(200, {
  message: "deve ser menor que 200",
});

export const zodPayment = zodNumberGT0.lt(500, {
  message: "deve ser menor que 500",
});

export const zodName = zodString.max(30, {
  message: "deve ter no máximo 30 caracteres",
});

export const zodQuantity = zodNumberGT0
  .lte(50, { message: "deve ser maior ou igual a 50" })
  .optional();

export const zodCapacity = zodNumberGT0
  .lte(30, { message: "deve ser maior ou igual a 30" })
  .optional();

export const zodBoolean = z
  .boolean({ invalid_type_error: "deve ser um boolean" })
  .optional();

export const zodDates = z
  .array(
    z
      .string({ invalid_type_error: " deve conter strings dentro do array" })
      .min(1, { message: "deve conter strings não vazias" }),
    { invalid_type_error: "deve ser um array de strings " }
  )
  .optional();

export const zodLimit = zodNumberGT0.optional();

export const zodEmail = zodString.email({
  message: "deve ser um email válido",
});
