import express from "express";
import { adminTokenMW, userTokenMW } from "../../../common/controller/tokenMidleware";
import { BookingBusiness } from "../business/booking.Business";
import { BookingDatabase } from "../database/booking.Database";
import { BookingController } from "./booking.Controller";

export const bookingRouter = express.Router();

const db = new BookingDatabase();
const business = new BookingBusiness( db);
const controller = new BookingController(business);

bookingRouter.get("/", userTokenMW, (req, res) =>  controller.findUserCheckin(req, res));
bookingRouter.get("/:id", userTokenMW, (req, res) =>  controller.findCheckin(req, res));


bookingRouter.get("/:entity/:id", adminTokenMW, (req, res) =>  controller.findCheckinByEntity(req, res)
);


// query para ver se sem contrato


bookingRouter.post("/",adminTokenMW, (req, res) => controller.createCheckin(req, res));

bookingRouter.delete("/:id", adminTokenMW, (req, res) => controller.deleteCheckin(req, res));