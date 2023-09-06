import { calculateEndDate } from "../../../../src/modules/contracts/business/contract.utils.calculateEnd";

describe("Contract utils: calculateEndDate function", ()=>{
  

        const validFormat = [
            {input:"2005-01-29", duration: 1, output:"01/03/2005"}, 
            {input:"2022-12-01",duration: 3 , output: "01/03/2023"},
            {input:"2022-05-01",duration: 6 , output: "01/11/2022"}
        ];

        validFormat.forEach((i) => {
          test(`Valid input date ${i.input} with duration ${i.duration}`, () => {
            const result = calculateEndDate(i.input, i.duration );
            expect(result).toBe(i.output);
          });
        });

      
      
     
      
})