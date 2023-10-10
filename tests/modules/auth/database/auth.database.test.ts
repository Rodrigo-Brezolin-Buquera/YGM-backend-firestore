import { NotFound } from "../../../../src/common/customError/notFound";
import { AuthDatabase } from "../../../../src/modules/auth/database/auth.Database";
import { User } from "../../../../src/modules/auth/domain/auth.Entity";

const authDB = new AuthDatabase();

describe.skip("AuthDatabase: CreateUser method", () => {
  test("Sucess case", async () => {
    const input = new User("test@test.com", "test user", "00-test-user-id");
    await authDB.createUser(input);
  });
});

describe.skip("AuthDatabase: FindUser  method", () => {
  test("Sucess case", async () => {
    const input = "00-test-user-id";
    const result = await authDB.findUser(input);
    expect(result).toBeInstanceOf(User);
    expect(result.getEmail()).toBe("test@test.com");
    expect(result.getName()).toBe("test user");
  });

  test("Error: user not found", async () => {
    expect.assertions(2);
    try {
      const input = "00";
      await authDB.findUser(input);
    } catch (error: any) {
      expect(error).toBeInstanceOf(NotFound);
      expect(error.message).toBe(`Não foi possível encontrar o(a) usuário`);
    }
  });
});

describe.skip("AuthDatabase: FinInactiveUsers method", () => {
  test("Sucess case", async () => {
    const result = await authDB.findInactiveUsers();
    expect(result.length).toBeGreaterThanOrEqual(0);
    expect(result[0]).toBeInstanceOf(User);
  });
});

// describe.skip("AuthDatabase: activeUser method", () => {
//   test("Sucess case", async () => {
//     const input = "00-test-user-id";
//     await authDB.activeUser(input);
//     const result = await authDB.findUser(input);
//     expect(result.getActive()).toBe(true);
//   });
// });

describe.skip("AuthDatabase: deleteUser method", () => {
    test("Sucess case", async () => { 
      const input = "00-test-user-id";
      await authDB.deleteUser(input)
    });
  });