import { z } from "zod"
import { zodBoolean, zodDates, zodEmail, zodNumber, zodString } from "../../../src/common/domain/common.zodPatterns"


const input = {
    string: 1,
    number: "fewf",
    email: "ffs",
    boolean: null,
    dates: [23]
}

const inputSchema = z.object({
    string: zodString,
    number: zodNumber,
    email: zodEmail,
    boolean: zodBoolean,
    dates: zodDates
  
  }).transform( data => data as Object)
  

 describe("ZodPatterns errors", ()=>{
     test("multiple cases", ()=>{
         expect.assertions(1)
         try {
            inputSchema.parse(input)
         } catch (error:any) {
             expect(error).toBeDefined()
         }
     })
 }) 