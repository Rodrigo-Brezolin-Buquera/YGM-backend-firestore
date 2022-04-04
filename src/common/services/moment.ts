import moment from "moment";
import { CustomError } from "../customError/customError";

export const calculateEndDate = (date:string, durationInMonths:number ):string => {
    const momentResult = moment(date, "DD-MM-YYYY").add(durationInMonths, "months").calendar();
    const [month, day, year] = momentResult.split("/")
    const endDate = `${day}/${month}/${year}`
return endDate
}

export const addOneWeek = (date: string): string => {
    const momentResult = moment(date, "DD-MM-YYYY").add(1, "weeks").calendar();
    const [month, day, year] = momentResult.split("/")
    const finalDate = `${day}/${month}/${year}`
    return finalDate
}

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