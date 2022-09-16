import { IdService } from "../../../src/common/aplication/common.Id.service";

const idService = new IdService()

describe("idService tests on commonApplication ", () => {

    test("Sucess case, generating Id", () => {
        const result = idService.generateId()
        expect(result).toBeDefined()
        expect(result.length).toBe(36) 
    })

 });
