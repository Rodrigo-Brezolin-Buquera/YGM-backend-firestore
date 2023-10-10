import { Plan, SimplePlan } from "../../../../src/modules/plans/domain/plan.Entity";

const getInitialObject = (): any => {
  return {
    id: "string",
    type: "Mensal",
    frequency: "1x",
    price: "R$ 100,00",
  };
};

describe("Plan entity", () => {
  test("Sucess case", () => {
    const input = getInitialObject();
    const result = Plan.toModel(input);
    expect(result).toBeInstanceOf(Plan);
  });

  test("Sucess case: getters", () => {
    const input = getInitialObject();
    const result = Plan.toModel(input);
    expect(result.getId()).toBe(input.id);
    expect(result.getType()).toBe(input.type);
    expect(result.getFrequency()).toBe(input.frequency);
    expect(result.getPrice()).toBe(input.price);
  });

  test("Sucess case: setters", () => {
    const input = getInitialObject();
    const result = Plan.toModel(input);
    result.setPrice("R$ 50,00");
    expect(result.getPrice()).toBe("R$ 50,00");
  });

  const validTypes = [
    "Mensal",
    "Trimestral",
    "Semestral",
    "Anual",
    "Avulsa",
    "Gympass",
    "Totalpass",
  ];
  validTypes.forEach((type) => {
    const input = getInitialObject();
    test(`Sucess case: valid type - ${type} `, () => {
      input.type = type;
      const result = Plan.toModel(input);
      expect(result).toBeInstanceOf(Plan);
    });
  });

  const validFrequency = ["1x", "2x", "3x", "---"];
  validFrequency.forEach((frequency) => {
    const input = getInitialObject();
    test(`Sucess case: valid frequency - ${frequency} `, () => {
      input.frequency = frequency;
      const result = Plan.toModel(input);
      expect(result).toBeInstanceOf(Plan);
    });
  });

  const invalidTypes = ["mensal", "app", "12312"];
  invalidTypes.forEach((type) => {
    const input = getInitialObject();
    test(`Error: invalid type - ${type} `, () => {
      expect.assertions(2);
      try {
        input.type = type;
        const result = Plan.toModel(input);
      } catch (error: any) {
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe(
          "O tipo do plano precisa ser: Mensal, Trimestral, Semestral, Avulsa, Gympass ou Totalpass"
        );
      }
    });
  });

  const invalidFrequency = ["1X", "2", "--", "aaaaa"];
  invalidFrequency.forEach((frequency) => {
    const input = getInitialObject();
    test(`Error: invalid frequency - ${frequency} `, () => {
      expect.assertions(2);
      try {
        input.frequency = frequency;
        const result = Plan.toModel(input);
      } catch (error: any) {
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe(
            "A frequências das aulas precisa ser: 1x, 2x, 3x ou ---"
        );
      }
    });
  });

  

});


describe("SimplePlan entity", () => {
    test("Sucess case", () => {
      const result = new SimplePlan("id", "TotalPass")
      expect(result).toBeInstanceOf(SimplePlan);
    });

})