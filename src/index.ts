import { app } from "./app";
import { authRouter } from "./modules/auth/presentation/Routes";
import { planRouter } from "./modules/plans/presentation/Routes";


app.use("/auth", authRouter  )
// app.use("/contracts",  )
app.use("/plans", planRouter )
// app.use("/calendar", )
// app.use("/booking", )
