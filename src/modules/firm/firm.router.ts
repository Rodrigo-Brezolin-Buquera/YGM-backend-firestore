import express from "express";
import { adminTokenMW } from "../../common/services/tokenMidleware";
import { FirmBusiness } from "./business/firm.Business";
import { FirmController } from "./controller/firm.Controller";
import { FirmDatabase } from "./database/firm.database";

export const businessRouter = express.Router()

const db = new FirmDatabase()
const business = new FirmBusiness(db)
const controller = new FirmController(business)

businessRouter.get("/",  (req, res) => controller.find(req, res))  
businessRouter.put("/", adminTokenMW, (req, res) => controller.edit(req, res))

