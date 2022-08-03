import { IncompatibleDates } from "../../src/common/customError/conflicts";
import {
  InvalidDate,
  InvalidId,
  InvalidInputDate,
  InvalidRequest,
} from "../../src/common/customError/invalidRequests";
import { InvalidSignature, TokenExpired } from "../../src/common/customError/unauthorized";
import { CommonDomain } from "../../src/common/domain/CommonDomain";

describe("Id tests on commonDomain ", () => {
  test("Sucess id test ", () => {
    const id = "dsuhaiuhsdihdia";
    expect.assertions(0);
    try {
      CommonDomain.checkId(id);
    } catch (error:any) {}
  });

  test("Invalid id test withouyt id", () => {
    let currentError = new InvalidId();
    const id:any = undefined;
    expect.assertions(3);
    try {
      CommonDomain.checkId(id);
    } catch (error:any) {
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
      CommonDomain.isValidDate(date);
    } catch (error:any) {}
  });

  test("Fail case with DD-MM-YYYY format", () => {
    const date = "20-05-2020";
    expect.assertions(3);
    try {
      CommonDomain.isValidDate(date);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with MM-DD-YYYY format", () => {
    const date = "05-20-2020";
    expect.assertions(3);
    try {
      CommonDomain.isValidDate(date);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with MM/DD/YYYY format", () => {
    const date = "05/20/2020";
    expect.assertions(3);
    try {
      CommonDomain.isValidDate(date);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with MM/DD/YY format", () => {
    const date = "05/20/20";
    expect.assertions(3);
    try {
      CommonDomain.isValidDate(date);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with YYYY-MM-DD format", () => {
    const date = "2020-05-20";
    expect.assertions(3);
    try {
      CommonDomain.isValidDate(date);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with DD/MM format", () => {
    const date = "20/05";
    expect.assertions(3);
    try {
      CommonDomain.isValidDate(date);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with DD/MM/YY format", () => {
    const date = "20/05/20";
    expect.assertions(3);
    try {
      CommonDomain.isValidDate(date);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with timestamp format", () => {
    const date = "1658602101";
    expect.assertions(3);
    try {
      CommonDomain.isValidDate(date);
    } catch (error:any) {
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
      const result = CommonDomain.adjustDate(date);

      expect(result).toBe("20/05/2020");
    } catch (error:any) {}
  });

  test("Fail case with DD-MM-YYYY format", () => {
    const date = "20-05-2020";
    expect.assertions(3);
    try {
      CommonDomain.adjustDate(date);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with MM-DD-YYYY format", () => {
    const date = "05-20-2020";
    expect.assertions(3);
    try {
      CommonDomain.adjustDate(date);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with MM/DD/YYYY format", () => {
    const date = "05/20/2020";
    expect.assertions(3);
    try {
      CommonDomain.adjustDate(date);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with MM/DD/YY format", () => {
    const date = "05/20/20";
    expect.assertions(3);
    try {
      CommonDomain.adjustDate(date);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with DD/MM format", () => {
    const date = "20/05";
    expect.assertions(3);
    try {
      CommonDomain.adjustDate(date);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with DD/MM/YY format", () => {
    const date = "20/05/20";
    expect.assertions(3);
    try {
      CommonDomain.adjustDate(date);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with timestamp format", () => {
    const date = "1658602101";
    expect.assertions(3);
    try {
      CommonDomain.adjustDate(date);
    } catch (error:any) {
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
      const result = CommonDomain.compareDates(date1, date2);

      expect(result).toBe(true);
    } catch (error:any) {}
  });

  test("Fail case", () => {
    const date1 = "20/05/2020";
    const date2 = "20/04/2020";
    expect.assertions(1);
    try {
      const result = CommonDomain.compareDates(date1, date2);
      expect(result).toBe(false);
    } catch (error:any) {}
  });

  test("Fail corner case", () => {
    const date1 = "20/05/2020";
    const date2 = "20/05/2020";
    expect.assertions(3);
    try {
      CommonDomain.compareDates(date1, date2);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });
});

describe("checkEmptyInput tests on commonDomain ", () => {
  let currentError = new InvalidRequest();
  const obj: any = {
    val1: "teste",
    val2: 1241,
    val3: true,
  };
  test("Sucess case with ", () => {
    expect.assertions(1);
    try {
      const result = CommonDomain.checkEmptyInput(obj);
      expect(result).toBe(false);
    } catch (error:any) {}
  });

  test("Fail case with empty string ", () => {
    obj.val2 = "";
    expect.assertions(3);
    try {
      CommonDomain.checkEmptyInput(obj);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with undefined ", () => {
    obj.val2 = undefined;
    expect.assertions(3);
    try {
      CommonDomain.checkEmptyInput(obj);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with null ", () => {
    obj.val2 = null;
    expect.assertions(3);
    try {
      CommonDomain.checkEmptyInput(obj);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });
});


describe("token error messages tests on commonDomain ", () => {
  
  let token: any = ""
  test("Fail case with empty string ", () => {
    const currentError = new InvalidSignature();
    expect.assertions(3);
    try {
      CommonDomain.verifyAdminPermission(token);
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with wrong string ", () => {
    const currentError = new InvalidSignature();
    token = "uewbfuibqwufba"
    expect.assertions(3);
    try {
      CommonDomain.verifyAdminPermission(token);
    } catch (error:any) { 
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Fail case with no token ", () => {
    const currentError = new InvalidSignature();
    token = undefined
    expect.assertions(3);
    try {
      CommonDomain.verifyAdminPermission(token);
    } catch (error:any) { 
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });
  
  test("Fail case with expired token ", () => {
    const currentError = new TokenExpired()
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRQWUNqNzZ0QTRYQ0dyd05WYTB3ajd4ajR6MzMiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjU5NTI0MTAzLCJleHAiOjE2NTk1Mjc3MDN9.2elbDew5kB8qWVra7yzOddR1ik_zzOq4y4jQ37vpiqM"
    expect.assertions(3);
    try {
      CommonDomain.verifyAdminPermission(token);
    } catch (error:any) { 
      console.log(error.message)
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

});

