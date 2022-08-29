import {
  InvalidClassQuantity,
  InvalidDuration,
  InvalidFrequency,
  InvalidPayment,
  InvalidPlanType,
} from "../../src/common/customError/invalidRequests";
import { Plan } from "../../src/modules/plans/domain/plans.Entity";

const getInitialObject = (): any => {
  return {
    id: "string",
    type: "Mensal",
    frequency: "1x",
    availableClasses: 10,
    durationInMonths: 3,
    monthlyPayment: "R$ 100,00"
  }
}

const instanceOfPlan = (obj: any): Plan => {
  const result = new Plan(
    obj.id,
    obj.type,
    obj.frequency,
    obj.availableClasses,
    obj.durationInMonths,
    obj.monthlyPayment
  );
  return result;
  }

describe("Sucess tests on Plan entity", () => {
  const plan = getInitialObject()
  test("Sucess case", () => {
    expect.assertions(1);
    try {
      const result = instanceOfPlan(plan)
      expect(result).toBeInstanceOf(Plan);
    } catch (error: any) {}
  });

  test("Sucess case with 0 availableClasses", () => {
    expect.assertions(1);
    plan.availableClasses = 0;
    try {
      const result = instanceOfPlan(plan).checkClasses();
      expect(result).toBeInstanceOf(Plan);
    } catch (error: any) {}
  });
});

describe("Fail type tests on Plan entity", () => {
  const plan = getInitialObject()
  const invalidType = new InvalidPlanType();

  test("Invalid without type ", () => {
    expect.assertions(3);
    plan.type = "";
    try {
      instanceOfPlan(plan).checkType();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidType.message);
      expect(error.statusCode).toBe(invalidType.statusCode);
     
    }
  });

  test("Invalid with wrong type ", () => {
    expect.assertions(3);
    plan.type = "teste";
    try {
      instanceOfPlan(plan).checkType();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidType.message);
      expect(error.statusCode).toBe(invalidType.statusCode);
    }
  });
});

describe("Fail frequency tests on Plan entity", () => {
  const plan = getInitialObject() 

  const invalidFrequency = new InvalidFrequency();

  test("Invalid without frequency ", () => {
    expect.assertions(3);
    plan.frequency = "";
    try {
      instanceOfPlan(plan).checkFrequency();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidFrequency.message);
      expect(error.statusCode).toBe(invalidFrequency.statusCode);
    }
  });

  test("Invalid with wrong frequency ", () => {
    expect.assertions(3);
    plan.frequency = 1;
    try {
      instanceOfPlan(plan).checkFrequency();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidFrequency.message);
      expect(error.statusCode).toBe(invalidFrequency.statusCode);
    }
  });
});

describe("Fail availableClasses tests on Plan entity", () => {
  const plan: any = getInitialObject();
  const invalidClass = new InvalidClassQuantity();

  test("Invalid without availableClasses ", () => {
    expect.assertions(3)
    plan.availableClasses = undefined;
    try {
      instanceOfPlan(plan).checkClasses();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidClass.message);
      expect(error.statusCode).toBe(invalidClass.statusCode);
    }
  });

  test("Invalid with negative availableClasses ", () => {
    expect.assertions(3)
    plan.availableClasses = -1;
    try {
      instanceOfPlan(plan).checkClasses();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidClass.message);
      expect(error.statusCode).toBe(invalidClass.statusCode);
    }
  });

  test("Invalid with string availableClasses ", () => {
    plan.availableClasses = "undefifafned";
    expect.assertions(3);
    try {
      instanceOfPlan(plan).checkClasses();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidClass.message);
      expect(error.statusCode).toBe(invalidClass.statusCode);
    }
  });
});

describe("Fail duration tests on Plan entity", () => {
  const plan = getInitialObject();
  const currentError = new InvalidDuration();

  test("Invalid without durationInMonths ", () => {
    plan.durationInMonths = undefined;
    expect.assertions(3);
    try {
      instanceOfPlan(plan).checkDuration();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Invalid with negative durationInMonths ", () => {
    plan.durationInMonths = -1;
    expect.assertions(3);
    try {
      instanceOfPlan(plan).checkDuration();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
      
    }
  });

  test("Invalid with string availableClasses ", () => {
    plan.durationInMonths = "undefifafned";
    expect.assertions(3);
    try {
      instanceOfPlan(plan).checkDuration();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });
});

describe("Fail monthlyPayment tests on Plan entity", () => {
  const plan = getInitialObject();
  const currentError = new InvalidPayment();

  test("Invalid without monthlyPayment ", () => {
    plan.monthlyPayment = undefined;
    expect.assertions(3);
    try {
      instanceOfPlan(plan).checkPayment();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Invalid without R$ ", () => {
    plan.monthlyPayment = "00,00";
    expect.assertions(3);
    try {
      instanceOfPlan(plan).checkPayment();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Invalid without coma ", () => {
    plan.monthlyPayment = "R$ 00";
    expect.assertions(3);
    try {
      instanceOfPlan(plan).checkPayment();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Invalid with longer size ", () => {
    plan.monthlyPayment = "R$ 00,0000000";
    expect.assertions(3);
    try {
      instanceOfPlan(plan).checkPayment();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Invalid with shorter size ", () => {
    plan.monthlyPayment = "R$00,0";
    expect.assertions(3);
    try {
      instanceOfPlan(plan).checkPayment();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });
  
});