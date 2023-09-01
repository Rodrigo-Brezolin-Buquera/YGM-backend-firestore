import { InvalidDate, InvalidName, InvalidTime } from "../customError/invalidRequests";

export const validateName = (name: string) => {
  const nameRegex: RegExp =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  if (!nameRegex.test(name)) {
    throw new InvalidName();
  }
};

export const validateDateFormat = (input: string) => {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!dateRegex.test(input)) {
    throw new InvalidDate();
  }
};


export const validateTime = (time:string) => {
  const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
  if (!timeRegex.test(time)) {
    throw new InvalidTime();
  }
}
