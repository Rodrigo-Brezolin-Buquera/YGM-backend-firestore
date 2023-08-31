import express from "express";
import { IdService } from "../../../common/aplication/common.Id.service";
import { CalendarBusiness } from "../business/calendar.Business";
import { CalendarDatabase } from "../database/calendar.Database";
import { CalendarController } from "./calendar.Presentation";

export const calendarRouter = express.Router();

const idService = new IdService();

const db = new CalendarDatabase();
const calendarApplication = new CalendarBusiness(db,idService);
const controller = new CalendarController(calendarApplication);


calendarRouter.get("/", (req, res) => controller.findClassesByPeriod(req, res)
);
calendarRouter.get("/:id", (req, res) => controller.findClass(req, res));

calendarRouter.post("/", (req, res) =>  controller.createClass(req, res));

calendarRouter.delete("/:id", (req, res) => controller.deleteClasses(req, res));
