import express from "express";
import { PlanBusiness } from "../business/Plan.Business";
import { PlanDatabase } from "../database/Plan.Database";
import { PlanController } from "./Plan.Controller";

export const planRouter = express.Router()


const db = new PlanDatabase()
const business = new PlanBusiness(db)
const controller = new PlanController(business)

planRouter.get("/", (req, res) => controller.findPlans(req, res))  

planRouter.post("/", (req, res) => controller.createPlan(req, res))

planRouter.put("/:id", (req, res) => controller.editPlan(req, res))

planRouter.delete("/:id", (req, res) => controller.deletePlan(req, res))
