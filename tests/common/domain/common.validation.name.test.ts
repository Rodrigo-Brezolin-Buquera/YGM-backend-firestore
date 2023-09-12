import { validateName } from "../../../src/common/domain/common.pattern.name";

describe("Common: ValidationName", () => {
  const validFormat = ["teste", "Teste", "teste teste", "teste, teste", "Teste'teste", "Teste-teste", "maça", "aâa", "aãa", "aáa", "aàa"];
  validFormat.forEach((name) => {
    test(`Valid name format ${name}`, () => {
      const result = validateName(name);
      expect(result).toBeUndefined();
    });
  });

  const invalidFormats = ["0432", "@AAA", "R0", "/", "*"];
  invalidFormats.forEach((name) => {
    test(`Invalid name format ${name}`, () => {
      expect.assertions(2);
      try {
        validateName(name);
      } catch (error: any) {
        expect(error.message).toBe(
          "Nomes não podem caracteres especiais e números"
        );
        expect(error.statusCode).toBe(400);
      }
    });
  });
});
