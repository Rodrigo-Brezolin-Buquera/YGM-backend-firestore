import express from "express"
import "express-async-errors";
import cors from "cors"
import { AddressInfo } from "net"
import { authRouter } from "./modules/auth/auth.router";
import { bookingRouter } from "./modules/booking/booking.router";
import { calendarRouter } from "./modules/calendar/calender.router";
import { contractRouter } from "./modules/contracts/contracts.router";
import { planRouter } from "./modules/plans/plan.router";
import { errorMiddlewWare } from "./common/customError/errorMiddleware";
import { adminLogin, tokenTest, userLogin } from "./common/testLogin";
import { businessRouter } from "./modules/firm/firm.router";

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
app.use("/business", businessRouter )

app.get("/testAdminLogin", adminLogin)
app.get("/testUserLogin", userLogin)


app.get("/tokentest", tokenTest)

app.use(errorMiddlewWare);