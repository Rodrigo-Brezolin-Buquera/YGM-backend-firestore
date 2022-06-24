import * as jwt from "jsonwebtoken";

export const generateToken = (payload: any): string => {
  const token = jwt.sign(
    payload, 
    process.env.JWT_KEY as string, 
    {
        expiresIn: process.env.JWT_DURATION as string,
    }
  );

  return token;
};
