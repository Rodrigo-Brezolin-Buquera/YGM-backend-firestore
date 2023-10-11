import { z } from "zod";

export const zodString = z
  .string({
    invalid_type_error: "deve ser uma string",
    required_error: "é obrigatório",
  })
  .min(1, { message: "deve ter pelo menos 1 caracter" })
  .trim();

export const zodNumber = z
  .number({
    invalid_type_error: "deve ser um número",
    required_error: "é obrigatório",
  })
  .int({ message: "deve ser um número inteiro" })
  .gt(0, { message: "deve ser maior do que 0" });

  export const zodOptinonalNumber = z
  .number({ invalid_type_error: "deve ser um número"})
  .int({ message: "deve ser um número inteiro" })
  .gt(0, { message: "deve ser maior do que 0"})
  .optional()

export const zodOptionalString = z
  .string({ invalid_type_error: "deve ser uma string" })
  .min(1, { message: "deve ter pelo menos 1 caracter" })
  .trim()
  .optional();


export const zodClasses = zodNumber.lt(200, {
  message: "deve ser menor que 200",
});

export const zodPayment = zodNumber.lt(500, {
  message: "deve ser menor que 500",
});

export const zodName = zodString.max(30, {
  message: "deve ter no máximo 30 caracteres",
});

export const zodCapacity = zodNumber
  .lte(30, { message: "deve ser menor ou igual a 30" })
  .optional();

  export const zodQuantity = zodNumber
  .lte(50, { message: "deve ser menor ou igual a 50" })
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

export const zodEmail = zodString.email({
  message: "deve ser um email válido",
});
