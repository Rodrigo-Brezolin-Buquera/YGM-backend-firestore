import express from "express";
import { adminTokenMW } from "../../../common/controller/tokenMidleWare";
import { PlanBusiness } from "../business/Plan.Business";
import { PlanDatabase } from "../database/Plan.Database";
import { PlanController } from "./Plan.Controller";

export const planRouter = express.Router()


const db = new PlanDatabase()
const business = new PlanBusiness(db)
const controller = new PlanController(business)

planRouter.get("/", (req, res) => controller.findPlans(req, res))  

planRouter.post("/", adminTokenMW,  (req, res) => controller.createPlan(req, res))

planRouter.put("/:id", adminTokenMW, (req, res) => controller.editPlan(req, res))

planRouter.delete("/:id", adminTokenMW, (req, res) => controller.deletePlan(req, res))
