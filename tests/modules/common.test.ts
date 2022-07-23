import { InvalidDate, InvalidId } from "../../src/common/customError/invalidRequests";
import { CommonDomain } from "../../src/common/domain/CommonDomain";

describe("Id tests on commonDomain ", () => {
  test("Sucess id test ", () => {
    const id = "dsuhaiuhsdihdia";
    expect.assertions(0);
    try {
      CommonDomain.checkId(id);
    } catch (error) {}
  });

  test("Invalid id test withouyt id", () => {
    let currentError = new InvalidId();
    const id = undefined;
    expect.assertions(3);
    try {
      CommonDomain.checkId(id);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });
});

describe("isValidDate tests on commonDomain ", () => {
    let currentError = new InvalidDate();
  test("Sucess case", () => {
    const date = "20/05/2020";
    expect.assertions(0);
    try {
      CommonDomain.isValidDate(date)
    } catch (error) {
    }
  });

  test("Fail case with DD-MM-YYYY format", () => {
    const date = "20-05-2020";
    expect.assertions(3);
    try {
      CommonDomain.isValidDate(date)
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with MM-DD-YYYY format", () => {
    const date = "05-20-2020";
    expect.assertions(3);
    try {
      CommonDomain.isValidDate(date)
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with MM/DD/YYYY format", () => {
    const date = "05/20/2020";
    expect.assertions(3);
    try {
      CommonDomain.isValidDate(date)
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with MM/DD/YY format", () => {
    const date = "05/20/20";
    expect.assertions(3);
    try {
      CommonDomain.isValidDate(date)
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with DD/MM/YY format", () => {
    const date = "20/05/20";
    expect.assertions(3);
    try {
      CommonDomain.isValidDate(date)
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with timestamp format", () => {
    const date = "1658602101";
    expect.assertions(3);
    try {
      CommonDomain.isValidDate(date)
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

});
