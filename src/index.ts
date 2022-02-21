import { app } from "./app";
import { planRouter } from "./modules/plans/presentation/Routes";


// app.use("/auth",  )
// app.use("/contracts",  )
app.use("/plans", planRouter )
// app.use("/calendar", )
// app.use("/booking", )
