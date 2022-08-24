import express from "express"
import cors from "cors"
import { AddressInfo } from "net"
import "express-async-errors";
import { Request, Response } from "express";

export const app = express()

app.use(express.json())
app.use(cors())

const server = app.listen(process.env.PORT || 3003, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost:${address.port}`);
   } else {
      console.error(`Failure upon starting server.`);
   }
})

app.use((err:any, req: Request, res: Response, _:any) => {
   res.status(err.statusCode || 500).send(err.message || err.sqlMessage);
 });