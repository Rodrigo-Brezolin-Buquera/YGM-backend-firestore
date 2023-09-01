export const calculateEndDate = (dateString:string, durationInMonths:number) => {
  const [year, month, day] = dateString.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  const newDate = new Date(date.getFullYear(), date.getMonth() + durationInMonths, date.getDate());
  const newDay = String(newDate.getDate()).padStart(2, "0");
  const newMonth = String(newDate.getMonth() + 1).padStart(2, "0");
  const newYear = newDate.getFullYear();
  return `${newDay}/${newMonth}/${newYear}`;
};

