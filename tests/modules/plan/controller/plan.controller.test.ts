import { PlanBusiness } from "../../../../src/modules/plans/business/plan.Business";
import { PlanController } from "../../../../src/modules/plans/controller/plan.Controller";
import { PlanBusinessMock } from "../mocks/plan.business.mock";
import { PLanDatabaseMock } from "../mocks/plan.database.mock";

const planBusiness = new PlanBusinessMock(
  new PLanDatabaseMock()
) as unknown as PlanBusiness;

const planController = new PlanController(planBusiness);

const res: any = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
};

describe("PlanController: FindPlans method", () => {
  const req: any = {};
  test("Sucess case", async () => {
    await planController.findPlans(req, res);
    expect(planBusiness.findPlans).toBeCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ result: [] });
  });
});

describe("PlanController: CreatePlan method", () => {
  const req: any = {};
  test("Sucess case", async () => {
    req.body = {
      type: "Mensal",
      frequency: "3x",
      availableClasses: 10,
      durationInMonths: 3,
      monthlyPayment: 100,
    };
    await planController.createPlan(req, res);
    expect(planBusiness.createPlan).toBeCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      message: "Plano criado com sucesso",
    });
  });

  test("Error: empty type", async () => {
    expect.assertions(1);
    try {
      req.body = {
        type: "",
        frequency: "3x",
        availableClasses: 10,
        durationInMonths: 3,
        monthlyPayment: 100,
      };
      await planController.createPlan(req, res);
    } catch (error: any) {
      expect(error).toBeDefined();
    }
  });

  test("Error: empty frequncy", async () => {
    expect.assertions(1);
    try {
      req.body = {
        type: "Mensal",
        frequency: "",
        availableClasses: 10,
        durationInMonths: 3,
        monthlyPayment: 100,
      };
      await planController.createPlan(req, res);
    } catch (error: any) {
      expect(error).toBeDefined();
    }
  });

  test("Error: invalid classes", async () => {
    expect.assertions(1);
    try {
      req.body = {
        type: "Mensal",
        frequency: "1x",
        availableClasses: -1,
        durationInMonths: 3,
        monthlyPayment: 100,
      };
      await planController.createPlan(req, res);
    } catch (error: any) {
      expect(error).toBeDefined();
    }
  });
  test("Error: invalid duration(less than 0)", async () => {
    expect.assertions(1);
    try {
      req.body = {
        type: "Mensal",
        frequency: "1x",
        availableClasses: 10,
        durationInMonths: -3,
        monthlyPayment: 100,
      };
      await planController.createPlan(req, res);
    } catch (error: any) {
      expect(error).toBeDefined();
    }
  });

  test("Error: invalid duration(more than 12)", async () => {
    expect.assertions(1);
    try {
      req.body = {
        type: "Mensal",
        frequency: "1x",
        availableClasses: 10,
        durationInMonths: 13,
        monthlyPayment: 100,
      };
      await planController.createPlan(req, res);
    } catch (error: any) {
      expect(error).toBeDefined();
    }
  });

  test("Error: invalid duration(non integer)", async () => {
    expect.assertions(1);
    try {
      req.body = {
        type: "Mensal",
        frequency: "1x",
        availableClasses: 10,
        durationInMonths: 5.5,
        monthlyPayment: 100,
      };
      await planController.createPlan(req, res);
    } catch (error: any) {
      expect(error).toBeDefined();
    }
  });

  test("Error: invalid payment(non integer)", async () => {
    expect.assertions(1);
    try {
      req.body = {
        type: "Mensal",
        frequency: "1x",
        availableClasses: 10,
        durationInMonths: 10,
        monthlyPayment: 100.5,
      };
      await planController.createPlan(req, res);
    } catch (error: any) {
      expect(error).toBeDefined();
    }
  });

  test("Error: invalid payment(zero or less )", async () => {
    expect.assertions(1);
    try {
      req.body = {
        type: "Mensal",
        frequency: "1x",
        availableClasses: 10,
        durationInMonths: 10,
        monthlyPayment: 0,
      };
      await planController.createPlan(req, res);
    } catch (error: any) {
      expect(error).toBeDefined();
    }
  });
});


describe("PlanController: EditPLan method", () => {
    const req: any = {params:{}};
    test("Sucess case", async () => {
        req.body = {
            monthlyPayment: 100
        }
        req.params.id ='id'
      await planController.editPlan(req, res);
      expect(planBusiness.editPlan).toBeCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: "Plano alterado com sucesso"});
    });

    test("Error: empty id", async () => {
        expect.assertions(1)
        try {
            req.body = {
                monthlyPayment: 100
            }
            req.params.id =''
          await planController.editPlan(req, res);
        } catch (error) {
            expect(error).toBeDefined()
        }
    });

});


describe("PlanController: DeletePlan method", () => {
    const req: any = {params:{}};
    test("Sucess case", async () => {
        req.params.id ='id'
      await planController.deletePlan(req, res);
      expect(planBusiness.deletePlan).toBeCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: "Plano deletado com sucesso" });
    });

    
});

