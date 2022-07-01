import moment from "moment";

// export const addOneWeek = (date: string): string => {
//     const momentResult = moment(date, "DD-MM-YYYY").add(1, "weeks").calendar();
//     const [month, day, year] = momentResult.split("/")
//     const finalDate = `${day}/${month}/${year}`
//     return finalDate
// }

export const addOneWeek = (date: string) => {
  const momentResult = moment(date, "DD-MM-YYYY").add(1, "weeks").calendar();
  const [month, day, year] = momentResult.split("/");
  const finalDate = `${day}/${month}/${year}`;
  return finalDate;
};

export const getToday = () => {
  return moment().format("DD/MM/YYYY");
};
