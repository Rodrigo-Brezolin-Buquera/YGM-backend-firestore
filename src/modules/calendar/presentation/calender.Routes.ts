import express from "express";
import { IdService } from "../../../common/aplication/common.Id.service";
import { adminTokenMW, userTokenMW } from "../../../common/controller/tokenMidleware";
import { CalendarBusiness } from "../business/calendar.Business";
import { CalendarDatabase } from "../database/calendar.Database";
import { CalendarController } from "./calendar.Presentation";

export const calendarRouter = express.Router();

const idService = new IdService();

const db = new CalendarDatabase();
const calendarApplication = new CalendarBusiness(db,idService);
const controller = new CalendarController(calendarApplication);


calendarRouter.get("/", userTokenMW,(req, res) => controller.findClassesByPeriod(req, res)
);
calendarRouter.get("/:id", adminTokenMW, (req, res) => controller.findClass(req, res));

calendarRouter.post("/", adminTokenMW, (req, res) =>  controller.createClass(req, res));

calendarRouter.delete("/:id", adminTokenMW, (req, res) => controller.deleteClasses(req, res));
