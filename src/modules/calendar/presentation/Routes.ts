import express from "express";
import { CalendarApplication } from "../application/Aplication";
import { CalendarInfrastructure } from "../infrastructure/Infrastructure";
import { CalendarPresentation } from "./calendar.Presentation";

export const calendarRouter = express.Router()

const calendarInfrastructure = new CalendarInfrastructure()
const calendarApplication = new CalendarApplication(calendarInfrastructure)
const calendarPresentation = new CalendarPresentation(calendarApplication)

calendarRouter.get("/", (req, res) => calendarPresentation.findAllClasses(req, res))  

calendarRouter.post("/", (req, res) => calendarPresentation.createClass(req, res))  

calendarRouter.put("/:groupId", (req, res) => calendarPresentation.editClass(req, res)) 

calendarRouter.delete("/:id/", (req, res) => calendarPresentation.deleteClass(req, res)) 
calendarRouter.delete("/:groupId/:date", (req, res) => calendarPresentation.deleteClasses(req, res)) 
