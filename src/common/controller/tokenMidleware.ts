import {Request, Response, NextFunction} from "express";
import TokenService from "./common.Token.service";

const tokenService = new TokenService()

export const userTokenMW = (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization as string
    tokenService.verifyUserPermission(token) 
    next();
};

export const userIdTokenMW = (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization as string
    req.body.id = tokenService.getTokenId(token)
    next();
};

export const adminTokenMW = (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization as string
    tokenService.verifyAdminPermission(token)    
    next();
};
