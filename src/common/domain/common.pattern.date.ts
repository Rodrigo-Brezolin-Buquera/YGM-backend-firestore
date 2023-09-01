import { CustomError } from "../customError/customError";

export const validateDateFormat = (input: string) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dateRegex.test(input)) {
        throw new CustomError("Data inválida, use o formato dd/mm/aaaa", 400);
    }
};