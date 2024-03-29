import express from "express";
import { adminTokenMW, userTokenMW } from "../../common/services/tokenMidleware";
import { BookingBusiness } from "./business/booking.Business";
import { BookingDatabase } from "./database/booking.Database";
import { BookingController } from "./controller/booking.Controller";

export const bookingRouter = express.Router();

const db = new BookingDatabase();
const business = new BookingBusiness( db);
const controller = new BookingController(business);

bookingRouter.get("/list", userTokenMW, (req, res) =>  controller.findUserCheckin(req, res));
bookingRouter.get("/:id", userTokenMW, (req, res) =>  controller.findCheckin(req, res));
bookingRouter.get("/:entity/:id", adminTokenMW, (req, res) =>  controller.findByEntity(req, res));

bookingRouter.post("/single/:classId",adminTokenMW, (req, res) => controller.createSingleCheckin(req, res));
bookingRouter.post("/:classId",userTokenMW, (req, res) => controller.createCheckin(req, res));

bookingRouter.delete("/:id", userTokenMW, (req, res) => controller.deleteCheckin(req, res));
