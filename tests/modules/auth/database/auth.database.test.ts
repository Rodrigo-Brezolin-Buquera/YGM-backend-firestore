import { AuthDatabase } from "../../../../src/modules/auth/database/auth.Database"


describe("Auth: ", ()=>{

    const authDB = new AuthDatabase()

    test("test", async ()=>{
       const result = await authDB.findInactiveUsers()
       console.log(result)
    })

})