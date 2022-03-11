import moment from "moment";
import { CustomError, InvalidDate } from "../customError/customError";

// export const isValidDate = (dateString:string):boolean => {
//     // First check for the pattern
//     if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
//         return false;

//     // Parse the date parts to integers
//     var parts = dateString.split("/");
//     var day = parseInt(parts[0], 10);
//     var month = parseInt(parts[1], 10);
//     var year = parseInt(parts[2], 10);

//     // Check the ranges of month and year
//     if(year < 1000 || year > 3000 || month == 0 || month > 12)
//         return false;

//     var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

//     // Adjust for leap years
//     if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
//         monthLength[1] = 29;

//     // Check the range of the day
//     return day > 0 && day <= monthLength[month - 1];
// };

export const isValidDate = (dateString:string):void => {
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)){
        throw new InvalidDate
    }
     
   const [day, month, year] = dateString.split("/")
   const date= moment(`${year}-${day}-${month}T00:00:00`)
    if(!date.isValid()){
        throw new InvalidDate
    }

};



/// usar o moment: 

// var a = moment("2018-18-10T10:20:25");
// a.isValid();
// a.invalidAt(); retorna 0 1 ou 2

// 0	years
// 1	months
// 2	days