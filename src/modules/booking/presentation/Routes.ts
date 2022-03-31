import express from "express";
import { BookingApplication } from "../application/Aplication";
import { BookingInfrastructure } from "../infrastructure/Infrastructure";
import { BookingPresentation } from "./Presentation";

export const bookingRouter = express.Router()

const bookingInfrastructure = new BookingInfrastructure()
const bookingApplication = new BookingApplication(bookingInfrastructure)
const bookingPresentation = new BookingPresentation(bookingApplication)

bookingRouter.post("/", (req, res) => bookingPresentation.createCheckin(req, res))  

bookingRouter.put("/", (req, res) => bookingPresentation.validateCheckin(req, res)) 

bookingRouter.delete("/:id", (req, res) => bookingPresentation.deleteCheckin(req, res)) 