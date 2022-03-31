import { app } from "./app";
import { authRouter } from "./modules/auth/presentation/Routes";
import { bookingRouter } from "./modules/booking/presentation/Routes";
import { calendarRouter } from "./modules/calendar/presentation/Routes";
import { contractsRouter } from "./modules/contracts/presentation/Routes";
import { planRouter } from "./modules/plans/presentation/Routes";


app.use("/auth", authRouter  )
app.use("/contracts", contractsRouter )
app.use("/plans", planRouter )
app.use("/calendar", calendarRouter )
app.use("/booking", bookingRouter )
