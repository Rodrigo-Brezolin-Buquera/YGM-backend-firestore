import express from "express";
import { TokenService } from "../../../common/aplication/common.Token.service";
import { BookingApplication } from "../application/booking.Application";
import { BookingRequestService } from "../application/booking.request.service";
import { BookingInfrastructure } from "../infrastructure/booking.Infrastructure";
import { BookingPresentation } from "./booking.Presentation";

export const bookingRouter = express.Router();

const tokenService = new TokenService();
const requestService = new BookingRequestService();

const bookingInfrastructure = new BookingInfrastructure();
const bookingApplication = new BookingApplication(
  bookingInfrastructure,
  tokenService,
  requestService
);
const bookingPresentation = new BookingPresentation(bookingApplication);

bookingRouter.get("/", (req, res) =>
  bookingPresentation.findUserCheckins(req, res)
);
bookingRouter.get("/:entity/:id", (req, res) =>
  bookingPresentation.findCheckinByEntity(req, res)
);

bookingRouter.post("/", (req, res) =>
  bookingPresentation.createCheckin(req, res)
);

bookingRouter.put("/", (req, res) =>
  bookingPresentation.validateCheckin(req, res)
);

bookingRouter.delete("/contract/:id", (req, res) =>
  bookingPresentation.deleteAllCheckinByContract(req, res)
);
bookingRouter.delete("/:id", (req, res) =>
  bookingPresentation.deleteCheckin(req, res)
);
