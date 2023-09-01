import { CustomError } from "../customError/customError";

export const validateName = (name: string) => {
  const nameRegex: RegExp =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  if (!nameRegex.test(name)) {
    throw new CustomError("Nomes não podem caracteres especiais e números", 400);
  }
};

