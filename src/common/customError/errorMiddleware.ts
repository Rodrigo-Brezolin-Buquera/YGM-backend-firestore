import { ZodError } from "zod"
import { zodErrorHandler } from "./zodErrorHandler"
import { Request, Response, NextFunction } from "express"

export const errorMiddlewWare = (err:any, req: Request, res: Response, _:NextFunction) => {
  console.log(err)
  
  if (err instanceof ZodError) {
    const message = zodErrorHandler(err.issues)
    res.status(400).send(err)
  } else {
    res.status(err.statusCode).send(err.message)
  }    
}