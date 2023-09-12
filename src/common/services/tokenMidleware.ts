import {Request, Response, NextFunction} from "express";
import TokenService from "../services/common.Token.service";

const tokenService = new TokenService()



export const userTokenMW = (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization as string
  req.body.tokenId = tokenService.verifyUserPermission(token)
  next();
};

export const adminTokenMW = (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization as string
  tokenService.verifyAdminPermission(token)    
  next();
};
