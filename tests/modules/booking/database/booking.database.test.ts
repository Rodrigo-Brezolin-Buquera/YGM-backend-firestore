import { BookingDatabase } from "../../../../src/modules/booking/database/booking.Database";
import { Checkin } from "../../../../src/modules/booking/domain/booking.Entity";

const bookingDB = new BookingDatabase()

describe("BookingDatabase: CreateCheckin method", ()=>{

    test("Sucess case", async ()=>{
           const input = Checkin.toModel({
            id: "00-test-id+3c875a5e-ff9d-4eaa-a5d7-2445654889b8",
            contractId: "00-test-id",
            yogaClassId: "3c875a5e-ff9d-4eaa-a5d7-2445654889b8",
            date: "05/08/2022",
            name: "name",
            time: "07:00",
        }) 

        const result = await bookingDB.createCheckin(input)
        expect(result).toBeUndefined()
    })
})

describe("BookingDatabase: FindCheckin method", ()=>{

    test("Sucess case", async ()=>{
           const input = "00-test-id+3c875a5e-ff9d-4eaa-a5d7-2445654889b8"
        const result = await bookingDB.findCheckin(input)
        expect(result).toBeInstanceOf(Checkin)
    })

    test("Sucess case: return null", async ()=>{
        const input = "00"
     const result = await bookingDB.findCheckin(input)
     expect(result).toBeNull()
 })
})

describe("BookingDatabase: FindByEntity method", ()=>{

    test("Sucess case: contract entity", async ()=>{  
        const result = await bookingDB.findByEntity("00-test-id","contractId", 1)
        expect(result[0]).toBeInstanceOf(Checkin)
    })

    test("Sucess case: contract entity", async ()=>{  
        const result = await bookingDB.findByEntity("3c875a5e-ff9d-4eaa-a5d7-2445654889b8","yogaClassId", 1)
        expect(result[0]).toBeInstanceOf(Checkin)
    })

    test("Sucess case: nothing found", async ()=>{  
        const result = await bookingDB.findByEntity("3c8754889b8","yogaClassId", 1)
        expect(result).toHaveLength(0)
    })

})

describe("BookingDatabase: DeleteCheckin method", ()=>{

    test("Sucess case:", async ()=>{  
        const input = "00-test-id+3c875a5e-ff9d-4eaa-a5d7-2445654889b8"
        const result = await bookingDB.deleteCheckin(input)
        expect(result).toBeUndefined()
    })

  

})