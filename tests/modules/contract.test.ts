import { ActiveIsNotBoolean, CheckinsArray, ClosedContractsArray, IncompatibleDates } from "../../src/common/customError/conflicts";
import {
    InvalidClassQuantity,
  InvalidName,
  InvalidPlan,
} from "../../src/common/customError/invalidRequests";
import { PLAN } from "../../src/modules/booking/domain/booking.Types";
import { Contract } from "../../src/modules/contracts/domain/contracts.Entity";

const instanceOfContract = (obj: any): Contract => {
  return new Contract(
    obj.id,
    obj.name,
    obj.closedContracts,
    obj.currentContract
  );
};

const getInitialObject = (): any => {
  return {
    id: "id",
    name: "name name",
    closedContracts: [{ ended: "26/01/2022", plan: "2x-Semestral" }],
    currentContract: {
      active: true,
      plan: PLAN.MONTHLYX1,
      started: "26/01/2022",
      ends: "26/07/2022",
      availableClasses: 20,
      checkins: [
        {
          date: "20/03/2022",
          id: "id",
          name: "name name",
          verified: true,
        },
      ],
    },
  };
};

describe("Sucess Tests on contract entity", () => {
  const obj = getInitialObject();
  test("Sucess case with all parameters", () => {
    expect.assertions(1);
    try {
      const result = instanceOfContract(obj);
      expect(result).toBeInstanceOf(Contract);
    } catch (error: any) {}
  });

  test("Sucess case with no closedContracts", () => {
    expect.assertions(1);
    obj.closedContracts = [];
    try {
      const result = instanceOfContract(obj);
      expect(result).toBeInstanceOf(Contract);
    } catch (error: any) {}
  });

  test("Sucess case with no closedContracts and checkins", () => {
    expect.assertions(1);
    obj.currentContract.checkins = [];
    try {
      const result = instanceOfContract(obj);
      expect(result).toBeInstanceOf(Contract);
    } catch (error: any) {}
  });
});

describe("Fail name tests on contract entity", () => {
  const obj = getInitialObject();
  const currentError = new InvalidName();

  test("Invalid without name", () => {
    obj.name = "";
    expect.assertions(3);
    try {
      instanceOfContract(obj).checkName();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Invalid with single name ", () => {
    obj.name = "teste";
    expect.assertions(3);
    try {
      instanceOfContract(obj).checkName();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });

  test("Invalid with number in name", () => {
    obj.name = "tefwe 3432dfe";
    expect.assertions(3);
    try {
      instanceOfContract(obj).checkName();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });
});

describe("Fail closedContracts tests on contract entity", () => {

    test("Conflict for not been an array", () => {
        const obj = getInitialObject();
        let currentError = new ClosedContractsArray();
        obj.closedContracts = 5;
        expect.assertions(3);
        try {
          instanceOfContract(obj).checkClosedContracts();
        } catch (error: any) {
          expect(error).toBeDefined();
          expect(error.message).toBe(currentError.message);
          expect(error.statusCode).toBe(currentError.statusCode);
        }
      }); 

  test("Invalid without plan", () => {
    const obj = getInitialObject();
    let currentError = new InvalidPlan();
    obj.closedContracts[0].plan = "";
    expect.assertions(3);
    try {
      instanceOfContract(obj).checkClosedContracts();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(currentError.message);
      expect(error.statusCode).toBe(currentError.statusCode);
    }
  });
});

describe("Fail currentContract tests on contract entity", () => {

    test("Invalid availableClasses for not been an number", () => {
        const obj = getInitialObject();
        let currentError = new InvalidClassQuantity();
        obj.currentContract.availableClasses = "wrgwe";
        expect.assertions(3);
        try {
          const result = instanceOfContract(obj).checkCurrentContract();       
        } catch (error: any) {
          expect(error).toBeDefined();
          expect(error.message).toBe(currentError.message);
          expect(error.statusCode).toBe(currentError.statusCode);
        }
      }); 

      test("Invalid availableClasses for not been less than 0", () => {
        const obj = getInitialObject();
        let currentError = new InvalidClassQuantity();
        obj.currentContract.availableClasses = -5;
        expect.assertions(3);
        try {
          instanceOfContract(obj).checkCurrentContract();
        } catch (error: any) {
          expect(error).toBeDefined();
          expect(error.message).toBe(currentError.message);
          expect(error.statusCode).toBe(currentError.statusCode);
        }
      }); 

      test("Invalid plan test without plan", () => {
        const obj = getInitialObject();
        let currentError = new InvalidPlan();
        obj.currentContract.plan = undefined;
        expect.assertions(3);
        try {
          instanceOfContract(obj).checkCurrentContract();
        } catch (error: any) {
          expect(error).toBeDefined();
          expect(error.message).toBe(currentError.message);
          expect(error.statusCode).toBe(currentError.statusCode);
        }
      }); 

      test("Incompatables dates test", () => {
        const obj = getInitialObject();
        let currentError = new IncompatibleDates();
        obj.currentContract.started = "20/05/2022";
        obj.currentContract.ended = "20/01/2022";
        expect.assertions(3);
        try {
          instanceOfContract(obj).checkCurrentContract();
        } catch (error: any) {
          expect(error).toBeDefined();
          expect(error.message).toBe(currentError.message);
          expect(error.statusCode).toBe(currentError.statusCode);
        }
      }); 

      test("Checkins is not an array", () => {
        const obj = getInitialObject();
        let currentError = new ActiveIsNotBoolean();
        obj.currentContract.active = 32;
        expect.assertions(3);
        try {
          instanceOfContract(obj).checkCurrentContract();
        } catch (error: any) {
          expect(error).toBeDefined();
          expect(error.message).toBe(currentError.message);
          expect(error.statusCode).toBe(currentError.statusCode);
        }
      }); 

});