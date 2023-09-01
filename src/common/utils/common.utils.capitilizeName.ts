export const capitalizeFirstLetter = (str:string) => {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};