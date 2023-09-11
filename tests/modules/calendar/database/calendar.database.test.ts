import { CalendarDatabase } from "../../../../src/modules/calendar/database/calendar.Database";
import { YogaClass } from "../../../../src/modules/calendar/domain/calendar.Entity";

const calendarDB = new CalendarDatabase()

const testClasses = [ 
    YogaClass.toModel({
    name: "Hatha Yoga",
    date: "01/01/2023",
    day: "Segunda",
    teacher: "Rodrigo",
    time: "18:00",
    capacity: 9,
    groupId: "test-groupId",
    id: "00-test-id-class",
  }),
  YogaClass.toModel({
    name: "Hatha Yoga",
    date: "07/01/2023",
    day: "Segunda",
    teacher: "Rodrigo",
    time: "18:00",
    capacity: 9,
    groupId: "test-groupId",
    id: "00-test-id-class2",
  }),
  YogaClass.toModel({
    name: "Hatha Yoga",
    date: "03/01/2023",
    day: "Segunda",
    teacher: "Rodrigo",
    time: "18:00",
    capacity: 9,
    groupId: "test-groupId",
    id: "00-test-id-class3",
  })

]

describe("CalendarDatabase: CreateClass method", ()=>{
    test("Sucess Case", async ()=> {
        const result = await calendarDB.createClass(testClasses[0])
        expect(result).toBeUndefined()
    })
})


describe("CalendarDatabase: FindClass method", ()=>{
    test("Sucess Case", async ()=> {
        const result = await calendarDB.findClass("00-test-id-class")
        expect(result).toBeInstanceOf(YogaClass)
        expect(result).toEqual(testClasses[0])
    })

    test("Error: Class not found", async ()=> {
        try {
             await calendarDB.findClass("1111")
        } catch (error:any) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Não foi possível encontrar o(a) aula")

        }
       
    })
})

describe("CalendarDatabase: FindClassByPeriod method", ()=>{

    beforeAll(async ()=>{
        await calendarDB.createClass(testClasses[1])
        await calendarDB.createClass(testClasses[2])
    })


    test("Sucess Case", async ()=> {
        const result = await calendarDB.findClassesByPeriod(["01/01/2023"])
        expect(result[0]).toBeInstanceOf(YogaClass)
        expect(result[0]).toEqual(testClasses[0])
    })

    test("Sucess Case: multiple dates", async ()=> {
        const result = await calendarDB.findClassesByPeriod(["01/01/2023", "03/01/2023" ])
        expect(result).toHaveLength(2)
        
    })

    test("Sucess Case: no dates found", async ()=> {
        const result = await calendarDB.findClassesByPeriod(["30/04/2023"])
        expect(result).toHaveLength(0)    
    })
})


describe("CalendarDatabase: DeleteClass method", ()=>{

    test("Sucess Case", async ()=> {
        try {
            await calendarDB.deleteClass("00-test-id-class")
            await calendarDB.findClass("00-test-id-class")
        } catch (error) {
            expect(error).toBeDefined()
        }
      
    })
})

describe("CalendarDatabase: DeleteAllClasses method", ()=>{

    test("Sucess Case", async ()=> {
        try {
            await calendarDB.deleteAllClasses("test-groupId")
            await calendarDB.findClass("00-test-id-class2")
        } catch (error) {
            expect(error).toBeDefined()
        }
      
    })
})