import moment from "moment";

export const addOneWeek = (date: string): string => {
    const momentResult = moment(date, "DD-MM-YYYY").add(1, "weeks").calendar();
    const [month, day, year] = momentResult.split("/")
    const finalDate = `${day}/${month}/${year}`
    return finalDate
}

