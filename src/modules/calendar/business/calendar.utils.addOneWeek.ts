export const addOneWeek = (dateString:string): string => {
  const [day, month, year] = dateString.split("/");
  const date = new Date(`${year}-${month}-${day}T23:59:59`);
  date.setDate(date.getDate() + 7);
  const newDay = String(date.getDate()).padStart(2, "0");
  const newMonth = String(date.getMonth() + 1).padStart(2, "0");
  const newYear = date.getFullYear();
  return `${newDay}/${newMonth}/${newYear}`;
};