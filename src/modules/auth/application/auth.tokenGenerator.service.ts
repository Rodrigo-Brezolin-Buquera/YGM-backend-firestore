import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Unauthorized } from "../../../common/customError/unauthorized";
dotenv.config();

// export const generateToken = (payload: any): string => {
//   try {
//     const token = jwt.sign(payload, process.env.JWT_KEY as string, {
//       expiresIn: process.env.JWT_DURATION as string,
//     });

//     return token;
//   } catch (error: any) {
//     console.log(error);
//     throw new Unauthorized();
//     // fazer tratamento melhor desse erro
//   }
// };
