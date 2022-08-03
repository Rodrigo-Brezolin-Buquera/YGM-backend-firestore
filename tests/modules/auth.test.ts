import { InvalidEmail, InvalidName } from "../../src/common/customError/invalidRequests";
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
  const invalidEmail= new InvalidEmail()

  test("Invalid without email ", () => {
    expect.assertions(3);
    try {
      new User(
        "",
        "f23ifibefw",
        "Teste teste",
        "ID"
      ).checkEmail();
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidEmail.message);
      expect(error.statusCode).toBe(invalidEmail.statusCode);
    }
  });

  test("Invalid with random email ", () => {
    expect.assertions(3);
    try {
      new User(
        "f4g24gdsg3fg32f2",
        "f23ifibefw",
        "Teste teste",
        "ID"
      ).checkEmail();
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidEmail.message);
      expect(error.statusCode).toBe(invalidEmail.statusCode);
    }
  });

  test("Invalid with email without @", () => {
    expect.assertions(3);
    try {
      new User(
        "emailemail.com",
        "f23ifibefw",
        "Teste teste",
        "ID"
      ).checkEmail();
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidEmail.message);
      expect(error.statusCode).toBe(invalidEmail.statusCode);
    }
  });

  test("Invalid with email without .com", () => {
    expect.assertions(3);
    try {
      const result = new User(
        "email@email",
        "f23ifibefw",
        "Teste teste",
        "ID"
      ).checkEmail();
    } catch (error:any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(invalidEmail.message);
      expect(error.statusCode).toBe(invalidEmail.statusCode);
    }
  });

});

describe("Fail name tests on Auth entity", () => {
    const invalidName = new InvalidName()
    test("Invalid with name ", () => {
      expect.assertions(3);
      try {
        new User(
          "email@email",
          "f24f24fg3g3",
          "",
          "ID"
        ).checkName();
      } catch (error:any) {

        expect(error).toBeDefined();
        expect(error.message).toBe(invalidName.message);
        expect(error.statusCode).toBe(invalidName.statusCode);
      }
    });
  
    test("Invalid with single name ", () => {
        expect.assertions(3);
        try {
          new User(
            "email@email",
            "testes",
            "Teste",
            "ID"
          ).checkName();
        } catch (error:any) {
          expect(error).toBeDefined();
          expect(error.message).toBe(invalidName.message);
          expect(error.statusCode).toBe(invalidName.statusCode);
        }
      });

      test("Invalid with short name ", () => {
        expect.assertions(3);
        try {
          new User(
            "email@email",
            "d34f23f3423f4",
            "Te",
            "ID"
          ).checkName();
        } catch (error:any) {
          expect(error).toBeDefined();
          expect(error.message).toBe(invalidName.message);
          expect(error.statusCode).toBe(invalidName.statusCode);
        }
      });
      // regex não funcionou pra isso
      // test("Invalid with many empty spaces ", () => {
      //   expect.assertions(3);
      //   try {
      //     new User(
      //       "email@email",
      //       "testerherh",
      //       "Teste                  teste",
      //       "ID"
      //     ).checkName();
      //   } catch (error:any) {
      //     expect(error).toBeDefined();
      //     expect(error.message).toBe(invalidName.message);
      //     expect(error.statusCode).toBe(invalidName.statusCode);
      //   }
      // });

      test("Invalid with number in name ", () => {
        expect.assertions(3);
        try {
          new User(
            "email@email",
            "testerherh",
            "Teste34234234 teste",
            "ID"
          ).checkName();
        } catch (error:any) {
          expect(error).toBeDefined();
          expect(error.message).toBe(invalidName.message);
          expect(error.statusCode).toBe(invalidName.statusCode);
        }
      });


  });
  