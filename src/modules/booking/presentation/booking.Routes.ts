import express from "express";
import { BookingApplication } from "../application/booking.Application";
import { BookingInfrastructure } from "../infrastructure/booking.Infrastructure";
import { BookingPresentation } from "./booking.Presentation";

export const bookingRouter = express.Router()


const bookingInfrastructure = new BookingInfrastructure()
const bookingApplication = new BookingApplication(bookingInfrastructure )
const bookingPresentation = new BookingPresentation(bookingApplication)

bookingRouter.get("/:entity/:id",(req, res) => bookingPresentation.findCheckinByEntity(req, res) )

bookingRouter.post("/", (req, res) => bookingPresentation.createCheckin(req, res))  

bookingRouter.put("/", (req, res) => bookingPresentation.validateCheckin(req, res)) 

bookingRouter.delete("/:checkinId", (req, res) => bookingPresentation.deleteCheckin(req, res)) 


