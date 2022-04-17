import moment from "moment";
import { CustomError } from "../customError/customError";

export const isValidDate = (dateString:string):void => {
   const [day, month, year] = dateString.split("/")
   const date= moment(`${year}-${day}-${month}T00:00:00`)
    if(!date.isValid()){
        throw CustomError.invalidDate()
    }
};

export const compareDates = (firstDate: string, secondDate: string): boolean => {
    const oldDate = moment(firstDate)
    const newDate = moment(secondDate)

    return newDate <= oldDate
}


// tranformar em classe e trazer outras verificações que sempre se repetem - como a de id