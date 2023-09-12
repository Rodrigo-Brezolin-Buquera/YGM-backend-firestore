import { formatDate } from "../../../src/common/utils/common.utils.formatDate";



describe("Common: FormatDate", () => {
    const validFormat = [{input:"2005-05-31", output:"31/05/2005"}, {input:"2022-12-01", output: "01/12/2022"}];
    validFormat.forEach((date) => {
      test(`Valid input date format ${date.input}`, () => {
        const result = formatDate(date.input);
        expect(result).toBe(date.output);
      });
    });
  
    const invalidFormats = ["2020-15-20", "2020-10-32", "2020-00-20", "2022/05/15", "30/01", "May 5, 2022", "01-10-","-05-2022","35/02/1998", "/", "DD/MM/YYYY", "*" ];
    invalidFormats.forEach((date) => {
      test(`Invalid input date format ${date}`, () => {
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
  