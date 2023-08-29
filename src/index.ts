import { app } from "./app";
import { authRouter } from "./modules/auth/presentation/auth.Routes";
import { bookingRouter } from "./modules/booking/presentation/booking.Routes";
import { calendarRouter } from "./modules/calendar/presentation/calender.Routes";
import { contractsRouter } from "./modules/contracts/presentation/contracts.Routes";
import { planRouter } from "./modules/plans/controller/plans.Routes";
import "express-async-errors";
import { Request, Response } from "express";

// app.use("/auth", authRouter  )
// app.use("/contracts", contractsRouter )
app.use("/plans", planRouter )
// app.use("/calendar", calendarRouter )
// app.use("/booking", bookingRouter )


app.use((err:any, req: Request, res: Response, _:any) => {
    res.status(err.statusCode || 500).send(err.message);
  });