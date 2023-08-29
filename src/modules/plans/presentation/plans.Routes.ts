import express from "express";
import { TokenService } from "../../../common/aplication/common.Token.service";
import { PlanApplication } from "../application/plans.Application";
import { PlanDatabase } from "../database/Plan.Database";
import { PlanPresentation } from "./plans.Presentation";

export const planRouter = express.Router()

const tokenService = new TokenService()

const db = new PlanDatabase()
const business = new PlanApplication(db, tokenService)
const controller = new PlanPresentation(business)

planRouter.get("/", (req, res) => controller.findPlans(req, res))  

planRouter.post("/", (req, res) => controller.createPlan(req, res))

planRouter.put("/:id", (req, res) => controller.editPlan(req, res))

planRouter.delete("/:id", (req, res) => controller.deletePlan(req, res))
