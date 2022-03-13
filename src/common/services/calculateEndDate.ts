import moment from "moment";

export const calculateEndDate = (date:string, durationInMonths:number ):string => {
    const momentResult = moment(date, "DD-MM-YYYY").add(durationInMonths, "months").calendar();
    const [month, day, year] = momentResult.split("/")
    const endDate = `${day}/${month}/${year}`
return endDate
}