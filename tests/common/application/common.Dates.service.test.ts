import { DateService } from "../../../src/common/aplication/common.Dates.service";
import { InvalidInputDate } from "../../../src/common/customError/invalidRequests";

const dateService = new DateService();

describe("DatesService - ajustDate tests on common application ", () => {
  let currentError = new InvalidInputDate();
  test("Sucess case", () => {
    const date = "2020-05-20";
    expect.assertions(1);
    try {
      const result = dateService.adjustDate(date);

      expect(result).toBe("20/05/2020");
    } catch (error: any) {}
  });

  test("Fail case with DD-MM-YYYY format", () => {
    const date = "20-05-2020";
    expect.assertions(3);
    try {
      dateService.adjustDate(date);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with MM-DD-YYYY format", () => {
    const date = "05-20-2020";
    expect.assertions(3);
    try {
      dateService.adjustDate(date);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with MM/DD/YYYY format", () => {
    const date = "05/20/2020";
    expect.assertions(3);
    try {
      dateService.adjustDate(date);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with MM/DD/YY format", () => {
    const date = "05/20/20";
    expect.assertions(3);
    try {
      dateService.adjustDate(date);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with DD/MM format", () => {
    const date = "20/05";
    expect.assertions(3);
    try {
      dateService.adjustDate(date);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with DD/MM/YY format", () => {
    const date = "20/05/20";
    expect.assertions(3);
    try {
      dateService.adjustDate(date);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with timestamp format", () => {
    const date = "1658602101";
    expect.assertions(3);
    try {
      dateService.adjustDate(date);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });
});

describe("DatesService - addOneWeek tests on common application ", () => {
  test("Sucess case in same month", () => {
    const date = "20/05/2020";
    expect.assertions(1);
    try {
        const result = dateService.addOneWeek(date)
        expect(result).toBe("27/05/2020")
    } catch (error: any) {}
  });

  test("Sucess case in diferent month", () => {
    const date = "31/05/2020";
    expect.assertions(1);
    try {
        const result = dateService.addOneWeek(date)
        expect(result).toBe("07/06/2020")
    } catch (error: any) {}
  });

  test("Sucess case in diferent year", () => {
    const date = "31/12/2020";
    expect.assertions(1);
    try {
        const result = dateService.addOneWeek(date)
        expect(result).toBe("07/01/2021")
    } catch (error: any) {}
  });
});

describe("DatesService - calculateEndDate tests on common application ", () => {
    let date = "01/01/2020";
    test("Sucess case with 1 month", () => {

    const durationInMonths = 1
    expect.assertions(1);
    try {
        const result = dateService.calculateEndDate(date, durationInMonths)
        expect(result).toBe("01/02/2020")
    } catch (error: any) {}
  });

  test("Sucess case wtih 3 months", () => {
    const durationInMonths = 3
    expect.assertions(1);
    try {
        const result = dateService.calculateEndDate(date, durationInMonths)
        expect(result).toBe("01/04/2020")
    } catch (error: any) {}
  });

  test("Sucess case wtih 6 months", () => {
    const durationInMonths = 6
    expect.assertions(1);
    try {
        const result = dateService.calculateEndDate(date, durationInMonths)
        expect(result).toBe("01/07/2020")
    } catch (error: any) {}
  });
});

describe("DatesService - getToday tests on common application ", () => {
  test("Sucess case", () => {
    expect.assertions(3);
    try {
      const result = dateService.getToday();
      expect(result).toBeDefined();
      expect(result.length).toBe(10);
      expect(result.includes("/")).toBe(true);
    } catch (error: any) {}
  });
});
