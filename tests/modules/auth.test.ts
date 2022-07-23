import { User } from "../../src/modules/auth/domain/auth.Entity";

describe("Sucess tests on Auth entity", () => {
  test("Sucess case", () => {
    const result = new User(
      "email@email.com",
      "f23ifibefw",
      "Teste teste",
      "ID"
    );
    expect(result).toBeInstanceOf(User);
    expect.assertions(1);
  });

  test("Sucess case wihtout ID", () => {
    const result = new User("email@email.com", "f23ifibefw", "Teste teste");
    expect(result).toBeInstanceOf(User);
    expect.assertions(1);
  });

  test("Sucess case wihtout ID and name", () => {
    const result = new User("email@email.com", "f23ifibefw");
    expect(result).toBeInstanceOf(User);
    expect.assertions(1);
  });
});

describe("Fail email tests on Auth entity", () => {
  test("Invalid without email ", () => {
    expect.assertions;
    try {
      new User(
        "",
        "f23ifibefw",
        "Teste teste",
        "ID"
      ).checkEmail();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe("Email inválido");
      expect(error.statusCode).toBe(406);
    }
  });

  test("Invalid with random email ", () => {
    expect.assertions;
    try {
      new User(
        "f4g24gdsg3fg32f2",
        "f23ifibefw",
        "Teste teste",
        "ID"
      ).checkEmail();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe("Email inválido");
      expect(error.statusCode).toBe(406);
    }
  });

  test("Invalid with email without @", () => {
    expect.assertions;
    try {
      new User(
        "emailemail.com",
        "f23ifibefw",
        "Teste teste",
        "ID"
      ).checkEmail();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe("Email inválido");
      expect(error.statusCode).toBe(406);
    }
  });

  test("Invalid with email without .com", () => {
    expect.assertions;
    try {
      const result = new User(
        "email@email",
        "f23ifibefw",
        "Teste teste",
        "ID"
      ).checkEmail();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe("Email inválido");
      expect(error.statusCode).toBe(406);
    }
  });

});

describe("Fail name tests on Auth entity", () => {
    test("Invalid with name ", () => {
      expect.assertions;
      try {
        new User(
          "email@email",
          "f24f24fg3g3",
          "",
          "ID"
        ).checkName();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe("Nomes precisam de pelo menos 5 caracteres, nome e sobrenome e não incluir números");
        expect(error.statusCode).toBe(411);
      }
    });
  
    test("Invalid with single name ", () => {
        expect.assertions;
        try {
          new User(
            "email@email",
            "testes",
            "Teste",
            "ID"
          ).checkName();
        } catch (error) {
          expect(error).toBeDefined();
          expect(error.message).toBe("Nomes precisam de pelo menos 5 caracteres, nome e sobrenome e não incluir números");
          expect(error.statusCode).toBe(411);
        }
      });

      test("Invalid with short name ", () => {
        expect.assertions;
        try {
          new User(
            "email@email",
            "d34f23f3423f4",
            "Test",
            "ID"
          ).checkName();
        } catch (error) {
          expect(error).toBeDefined();
          expect(error.message).toBe("Nomes precisam de pelo menos 5 caracteres, nome e sobrenome e não incluir números");
          expect(error.statusCode).toBe(411);
        }
      });

      test("Invalid with many empty spaces ", () => {
        expect.assertions;
        try {
          new User(
            "email@email",
            "testerherh",
            "Teste                  teste",
            "ID"
          ).checkName();
        } catch (error) {
          expect(error).toBeDefined();
          expect(error.message).toBe("Nomes precisam de pelo menos 5 caracteres, nome e sobrenome e não incluir números");
          expect(error.statusCode).toBe(411);
        }
      });

      test("Invalid with number in name ", () => {
        expect.assertions;
        try {
          new User(
            "email@email",
            "testerherh",
            "Teste34234234 teste",
            "ID"
          ).checkName();
        } catch (error) {
          expect(error).toBeDefined();
          expect(error.message).toBe("Nomes precisam de pelo menos 5 caracteres, nome e sobrenome e não incluir números");
          expect(error.statusCode).toBe(411);
        }
      });


  });
  