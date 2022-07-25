import { IncompatibleDates } from "../../src/common/customError/conflicts";
import { InvalidDate, InvalidId, InvalidInputDate } from "../../src/common/customError/invalidRequests";
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

  test("Fail case with YYYY-MM-DD format", () => {
    const date = "2020-05-20";
    expect.assertions(3);
    try {
      CommonDomain.isValidDate(date)
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with DD/MM format", () => {
    const date = "20/05";
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

describe("ajustDate tests on commonDomain ", () => {
    let currentError = new InvalidInputDate();
  test("Sucess case", () => {
    const date = "2020-05-20";
    expect.assertions(1);
    try {
      const result = CommonDomain.adjustDate(date)
      
      expect(result).toBe("20/05/2020")
    } catch (error) {
    }
  });

  test("Fail case with DD-MM-YYYY format", () => {
    const date = "20-05-2020";
    expect.assertions(3);
    try {
      CommonDomain.adjustDate(date)
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
      CommonDomain.adjustDate(date)
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
      CommonDomain.adjustDate(date)
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
      CommonDomain.adjustDate(date)
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with DD/MM format", () => {
    const date = "20/05";
    expect.assertions(3);
    try {
      CommonDomain.adjustDate(date)
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
      CommonDomain.adjustDate(date)
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
      CommonDomain.adjustDate(date)
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

});




describe("compareDates tests on commonDomain ", () => {
  let currentError = new IncompatibleDates();
test("Sucess case", () => {
  const date1 = "20/05/2020";
  const date2 = "20/06/2020";
  expect.assertions(1);
  try {
    const result = CommonDomain.compareDates(date1, date2)
  
    expect(result).toBe(true)
  } catch (error) {

  }
});

test("Fail case", () => {
  const date1 = "20/05/2020";
  const date2 = "20/04/2020";
  expect.assertions(1);
  try {
    const result = CommonDomain.compareDates(date1, date2)
    expect(result).toBe(false)
  } catch (error) {
   
  }
});

test("Fail corner case", () => {
  const date1 = "20/05/2020";
  const date2 = "20/05/2020";
  expect.assertions(3);
  try {
    CommonDomain.compareDates(date1, date2)
  } catch (error) {
    expect(error).toBeDefined();
    expect(error.message).toBe(currentError.message);
    expect(error.statusCode).toBe(currentError.statusCode);
  }
});

})
