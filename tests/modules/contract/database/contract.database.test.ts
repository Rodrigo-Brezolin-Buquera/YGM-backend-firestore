import { Plan } from "../../../../src/common/domain/common.enum.Plan";
import { ContractDatabase } from "../../../../src/modules/contracts/database/contracts.Database";
import { Contract } from "../../../../src/modules/contracts/domain/contract.Entity";

const contractDB = new ContractDatabase()

describe.skip("ContractDatase: CreateContract method", ()=>{
    const input = Contract.toModel ({
        id:  "00-test-id",
        name:  "test",
        plan:  Plan.MONTHLYX1,
        started:  "15/03/2020",
        ends:  "15/03/2020",
        availableClasses:  10
    })
    test("Sucess case", async ()=>{
        const result = await contractDB.createContract(input)
        expect(result).toBeUndefined()
    })
})

describe.skip("ContractDatase: FindAllContracts method", ()=>{
    test("Sucess case", async ()=>{
        const result = await contractDB.findAllContracts()
        expect(result[0]).toBeInstanceOf(Contract)
    })
})

describe.skip("ContractDatase: FindContract method", ()=>{
    const input =  "00-test-id"
    test("Sucess case", async ()=>{
        const result = await contractDB.findContract(input)
        expect(result).toBeInstanceOf(Contract)
        expect(result?.getName()).toBe("test")
    })
})

describe.skip("ContractDatase: EditContract method", ()=>{
    const input = Contract.toModel ({
        id:  "00-test-id",
        name:  "altered",
        plan:  Plan.MONTHLYX1,
        started:  "15/03/2020",
        ends:  "15/03/2020",
        availableClasses:  10
    })
    test("Sucess case", async ()=>{
         await contractDB.editContract(input)
         const result = await contractDB.findContract(input.getId())
        expect(result?.getName()).toBe("altered")
    })
})
