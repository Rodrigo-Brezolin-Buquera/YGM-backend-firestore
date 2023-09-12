import { validateDateFormat } from "../../../src/common/domain/common.pattern.date";



describe("Common: ValidationTime", () => {
    const validFormat = ["01/10/2001", "29/02/2022"];
    validFormat.forEach((date) => {
      test(`Valid date format ${date}`, () => {
        const result = validateDateFormat(date);
        expect(result).toBeUndefined();
      });
    });
  
    const invalidFormats = ["2005-05-05","2022/05/15", "30/01", "01-10-2001", "May 5, 2022", "01-10-","-05-2022","35/02/1998", "/", "DD/MM/YYYY", "50/20/3050","*" ];
    invalidFormats.forEach((date) => {
      test(`Invalid date format ${date}`, () => {
        expect.assertions(2);
        try {
          validateDateFormat(date);
        } catch (error: any) {
          expect(error.message).toBe(
            "Data inválida, use o formato dd/mm/aaaa"
            ||
            "Data inválida, verifique os valores dos dias e meses"
          )
          expect(error.statusCode).toBe(400);
        }
      });
    });
  });
  