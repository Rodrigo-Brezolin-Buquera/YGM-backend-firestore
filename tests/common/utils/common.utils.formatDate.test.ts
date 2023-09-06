import { formatDate } from "../../../src/common/utils/common.utils.formatDate";



describe("Common: FormatDate", () => {
    const validFormat = ["2005-05-05", "2022-12-01"];
    validFormat.forEach((date) => {
      test(`Valid date format ${date}`, () => {
        const result = formatDate(date);
        expect(result).toBeUndefined();
      });
    });
  
    const invalidFormats = ["2022/05/15", "30/01", "01-10-2001", "May 5, 2022", "01-10-","-05-2022","35/02/1998", "/", "DD/MM/YYYY", "*" ];
    invalidFormats.forEach((date) => {
      test(`Invalid date format ${date}`, () => {
        expect.assertions(2);
        try {
          formatDate(date);
        } catch (error: any) {
          expect(error.message).toBe(
            "Data inválida para requisição, use o formato YYYY-MM-DD"
          )
          expect(error.statusCode).toBe(406);
        }
      });
    });
  });
  