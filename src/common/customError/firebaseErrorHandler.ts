import { FirebaseError } from "firebase/app";
import { CustomError } from "./customError";

export const firebaseErrorHandler = (error: FirebaseError): void => {
  const code = error.code;

  switch (code) {
    case "auth/wrong-password":
        throw new CustomError("Senha incorreta", 400);
      break;

    default:
      throw new CustomError("deu ruim", 500)
      break;
  }

};
