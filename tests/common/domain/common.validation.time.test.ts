import { validateTime } from "../../../src/common/domain/common.pattern.time";



describe("Common: ValidationTime", () => {
    const validFormat = ["01:00", "21:52", "12:37", "00:00"];
    validFormat.forEach((time) => {
      test(`Valid time format ${time}`, () => {
        const result = validateTime(time);
        expect(result).toBeUndefined();
      });
    });
  
    const invalidFormats = ["1:00","25:00", "18:99", "17:60", "12:0", ":00", ":", "*" ];
    invalidFormats.forEach((time) => {
      test(`Invalid time format ${time}`, () => {
        expect.assertions(2);
        try {
          validateTime(time);
        } catch (error: any) {
          expect(error.message).toBe( "O horário deve ser no formato: `hh:mm`")
          expect(error.statusCode).toBe(400);
        }
      });
    });
  });