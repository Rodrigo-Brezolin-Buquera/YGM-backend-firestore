import express from "express";
import { DateService } from "../../../common/aplication/common.Dates.service";
import { IdService } from "../../../common/aplication/common.Id.service";
import { TokenService } from "../../../common/controller/common.Token.service";
import { CalendarApplication } from "../application/calendar.Application";
import { CalendarInfrastructure } from "../infrastructure/calendar.Infrastrucure";
import { CalendarPresentation } from "./calendar.Presentation";

export const calendarRouter = express.Router();

const tokenService = new TokenService();
const idService = new IdService();
const dataService = new DateService();

const calendarInfrastructure = new CalendarInfrastructure();
const calendarApplication = new CalendarApplication(
  calendarInfrastructure,
  tokenService,
  idService,
  dataService
);
const calendarPresentation = new CalendarPresentation(calendarApplication);

calendarRouter.get("/", (req, res) =>
  calendarPresentation.findAllClasses(req, res)
);
calendarRouter.get("/:id", (req, res) =>
  calendarPresentation.findClassById(req, res)
);

calendarRouter.post("/", (req, res) =>
  calendarPresentation.createClass(req, res)
);

calendarRouter.put("/changeCapacity/:action/:id", (req, res) =>
  calendarPresentation.changeCapacity(req, res)
);
calendarRouter.put("/:groupId", (req, res) =>
  calendarPresentation.editClass(req, res)
);

calendarRouter.delete("/:id", (req, res) =>
  calendarPresentation.deleteClasses(req, res)
);
