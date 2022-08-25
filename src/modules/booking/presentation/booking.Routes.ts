import express from "express";
import { BookingApplication } from "../application/booking.Checkin.Application";
import { BookingContractService } from "../infrastructure/booking.Contract.Infrastructure";
import { BookingYogaClassService } from "../infrastructure/booking.YogaClass.Infrastructure";
import { BookingPresentation } from "./booking.Presentation";

export const bookingRouter = express.Router()

// const bookingContractService = new BookingContractService()
// const bookingYogaClassService = new BookingYogaClassService()
const bookingApplication = new BookingApplication(bookingContractService, bookingYogaClassService )
const bookingPresentation = new BookingPresentation(bookingApplication)

bookingRouter.post("/", (req, res) => bookingPresentation.createCheckin(req, res))  

bookingRouter.put("/", (req, res) => bookingPresentation.validateCheckin(req, res)) 

bookingRouter.delete("/:checkinId", (req, res) => bookingPresentation.deleteCheckin(req, res)) 