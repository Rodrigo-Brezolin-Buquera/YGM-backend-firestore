import express from "express"
import cors from "cors"
import { AddressInfo } from "net"
import { authRouter } from "./modules/auth/auth.router";
import { bookingRouter } from "./modules/booking/booking.router";
import { calendarRouter } from "./modules/calendar/calender.router";
import { contractRouter } from "./modules/contracts/contracts.router";
import { planRouter } from "./modules/plans/plan.router";
import "express-async-errors";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { CustomError } from "./common/customError/customError";
import { zodErrorHandler } from "./common/customError/zodErrorHandler";
import { FirebaseError, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./common/database/config";

export const app = express()

app.use(express.json())
app.use(cors())

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error("Failure upon starting server.");
  }
})

app.use("/auth", authRouter  )
app.use("/contracts", contractRouter )
app.use("/plans", planRouter )
app.use("/calendar", calendarRouter )
app.use("/booking", bookingRouter )


app.get("/testLogin", async (req: Request, res: Response)=> {
  const auth = getAuth(initializeApp(firebaseConfig))
  const credential = await signInWithEmailAndPassword( auth,
     "admintest@email.com",
    "123456"
  )
  const token = await credential.user.getIdToken()
    res.send(token)

})

app.use((err:any, req: Request, res: Response, _:any) => {
  console.log(err)
  
  if (err instanceof ZodError) {
    const message = zodErrorHandler(err.issues)
    res.status(400).send(message)
  } else if (err instanceof CustomError) {
    res.status(err.statusCode).send(err.message)
 }else {
    res.status(500).send("Erro inesperado no servidor, por favor tente novamente")
  }
});