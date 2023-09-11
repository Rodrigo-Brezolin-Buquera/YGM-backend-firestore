import { ZodError } from "zod"
import { CustomError } from "./customError"
import { zodErrorHandler } from "./zodErrorHandler"
import { Request, Response, NextFunction } from "express"

export const errorMiddlewWare = (err:unknown, req: Request, res: Response, _:NextFunction) => {
    console.log(err)
  
    if (err instanceof ZodError) {
      const message = zodErrorHandler(err.issues)
      res.status(400).send(message)
    } else if (err instanceof CustomError) {
      res.status(err.statusCode).send(err.message)
   }else {
      res.status(500).send("Erro inesperado no servidor, por favor tente novamente")
    }
    
  }