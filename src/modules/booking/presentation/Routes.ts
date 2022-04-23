import express from "express";
import { BookingApplication } from "../application/Aplication";
import { BookingContractService } from "../infrastructure/booking.Contract.service";
import { BookingYogaClassService } from "../infrastructure/booking.YogaClass.service";
import { BookingPresentation } from "./booking.Presentation";

export const bookingRouter = express.Router()

const bookingContractService = new BookingContractService()
const bookingYogaClassService = new BookingYogaClassService()
const bookingApplication = new BookingApplication(bookingContractService, bookingYogaClassService )
const bookingPresentation = new BookingPresentation(bookingApplication)

bookingRouter.post("/", (req, res) => bookingPresentation.createCheckin(req, res))  

bookingRouter.put("/", (req, res) => bookingPresentation.validateCheckin(req, res)) 

bookingRouter.delete("/:checkinId", (req, res) => bookingPresentation.deleteCheckin(req, res)) 