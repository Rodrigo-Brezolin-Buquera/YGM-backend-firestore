import {
  InvalidClassQuantity,
  InvalidDuration,
  InvalidFrequency,
  InvalidPlanType,
} from "../../src/common/customError/invalidRequests";
import { Plan } from "../../src/modules/plans/domain/plans.Entity";
import { FREQUENCY, TYPE } from "../../src/modules/plans/domain/plans.Types";

describe("Sucess tests on Plan entity", () => {
  const plan: any = {
    id: "string",
    type: TYPE.MONTHLY,
    frequency: FREQUENCY.ONE,
    availableClasses: 10,
    durationInMonths: 3,
  };
  test("Sucess case", () => {
    expect.assertions;
    try {
      const result = new Plan(
        plan.id,
        plan.type,
        plan.frequency,
        plan.availableClasses,
        plan.durationInMonths
      );
      expect(result).toBeInstanceOf(Plan);
    } catch (error) {}
  });

  test("Sucess case with 0 availableClasses", () => {
    expect.assertions;
    plan.availableClasses = 0;
    try {
      const result = new Plan(
        plan.id,
        plan.type,
        plan.frequency,
        plan.availableClasses,
        plan.durationInMonths
      ).checkClasses();
      expect(result).toBeInstanceOf(Plan);
    } catch (error) {}
  });
});

describe("Fail type tests on Plan entity", () => {
  const plan: any = {
    id: "string",
    type: TYPE.MONTHLY,
    frequency: FREQUENCY.ONE,
    availableClasses: 10,
    durationInMonths: 3,
  };
  const invalidType = new InvalidPlanType();

  test("Invalid without type ", () => {
    plan.type = "";
    try {
      new Plan(
        plan.id,
        plan.type,
        plan.frequency,
        plan.availableClasses,
        plan.durationInMonths
      ).checkType();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidType.message);
      expect(error.statusCode).toBe(invalidType.statusCode);
      expect.assertions(3);
    }
  });

  test("Invalid with wrong type ", () => {
    plan.type = "teste";
    try {
      new Plan(
        plan.id,
        plan.type,
        plan.frequency,
        plan.availableClasses,
        plan.durationInMonths
      ).checkType();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidType.message);
      expect(error.statusCode).toBe(invalidType.statusCode);
      expect.assertions(3);
    }
  });
});

describe("Fail frequency tests on Plan entity", () => {
  const plan: any = {
    id: "string",
    type: TYPE.MONTHLY,
    frequency: FREQUENCY.ONE,
    availableClasses: 10,
    durationInMonths: 3,
  };
  const invalidFrequency = new InvalidFrequency();

  test("Invalid without frequency ", () => {
    plan.frequency = "";
    try {
      new Plan(
        plan.id,
        plan.type,
        plan.frequency,
        plan.availableClasses,
        plan.durationInMonths
      ).checkFrequency();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidFrequency.message);
      expect(error.statusCode).toBe(invalidFrequency.statusCode);
      expect.assertions(3);
    }
  });

  test("Invalid with wrong frequency ", () => {
    plan.frequency = 1;
    try {
      new Plan(
        plan.id,
        plan.type,
        plan.frequency,
        plan.availableClasses,
        plan.durationInMonths
      ).checkFrequency();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidFrequency.message);
      expect(error.statusCode).toBe(invalidFrequency.statusCode);
      expect.assertions(3);
    }
  });
});

describe("Fail availableClasses tests on Plan entity", () => {
  const plan: any = {
    id: "string",
    type: TYPE.MONTHLY,
    frequency: FREQUENCY.ONE,
    availableClasses: 10,
    durationInMonths: 3,
  };
  const invalidClass = new InvalidClassQuantity();

  test("Invalid without availableClasses ", () => {
    plan.availableClasses = undefined;
    try {
      new Plan(
        plan.id,
        plan.type,
        plan.frequency,
        plan.availableClasses,
        plan.durationInMonths
      ).checkClasses();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidClass.message);
      expect(error.statusCode).toBe(invalidClass.statusCode);
      expect.assertions(3);
    }
  });

  test("Invalid with negative availableClasses ", () => {
    plan.availableClasses = -1;
    try {
      new Plan(
        plan.id,
        plan.type,
        plan.frequency,
        plan.availableClasses,
        plan.durationInMonths
      ).checkClasses();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidClass.message);
      expect(error.statusCode).toBe(invalidClass.statusCode);
      expect.assertions(3);
    }
  });

  test("Invalid with string availableClasses ", () => {
    plan.availableClasses = "undefifafned";
    expect.assertions;
    try {
      new Plan(
        plan.id,
        plan.type,
        plan.frequency,
        plan.availableClasses,
        plan.durationInMonths
      ).checkClasses();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidClass.message);
      expect(error.statusCode).toBe(invalidClass.statusCode);
    }
  });
});

describe("Fail duration tests on Plan entity", () => {
  const plan: any = {
    id: "string",
    type: TYPE.MONTHLY,
    frequency: FREQUENCY.ONE,
    availableClasses: 10,
    durationInMonths: 3,
  };
  const currentError = new InvalidDuration();

  test("Invalid without durationInMonths ", () => {
    plan.durationInMonths = undefined;
    expect.assertions;
    try {
      new Plan(
        plan.id,
        plan.type,
        plan.frequency,
        plan.availableClasses,
        plan.durationInMonths
      ).checkDuration();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Invalid with negative durationInMonths ", () => {
    plan.durationInMonths = -1;
    expect.assertions;
    try {
      new Plan(
        plan.id,
        plan.type,
        plan.frequency,
        plan.availableClasses,
        plan.durationInMonths
      ).checkDuration();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
      
    }
  });

  test("Invalid with 0 durationInMonths ", () => {
    plan.durationInMonths = 0;
    expect.assertions;
    try {
      new Plan(
        plan.id,
        plan.type,
        plan.frequency,
        plan.availableClasses,
        plan.durationInMonths
      ).checkDuration();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
      
    }
  });

  test("Invalid with string availableClasses ", () => {
    plan.durationInMonths = "undefifafned";
    expect.assertions;
    try {
      new Plan(
        plan.id,
        plan.type,
        plan.frequency,
        plan.availableClasses,
        plan.durationInMonths
      ).checkDuration();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });
});
