import * as jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

export const generateToken = (payload: any): string => {

  try {
    const token = jwt.sign(
      payload, 
      process.env.JWT_KEY as string, 
      {
          expiresIn: process.env.JWT_DURATION as string,
      }
    );
  
    return token;
  } catch (error) {
    console.log(error)
  }
  
};
