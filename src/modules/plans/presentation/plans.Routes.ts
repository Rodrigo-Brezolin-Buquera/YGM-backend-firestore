import express from "express";
import TokenService from "../../../common/aplication/common.Token.service";
import { PlanApplication } from "../application/plans.Application";
import { PlanInfrastructure } from "../infrastructure/plans.Infrastructure";
import { PlanPresentation } from "./plans.Presentation";

export const planRouter = express.Router()

const tokenService = new TokenService()

const planInfrastructure = new PlanInfrastructure()
const planApplication = new PlanApplication(planInfrastructure, tokenService)
const planPresentation = new PlanPresentation(planApplication)

planRouter.get("/list", (req, res) => planPresentation.findPlans(req, res))  

planRouter.post("/", (req, res) => planPresentation.createPlan(req, res))

planRouter.put("/:id", (req, res) => planPresentation.editPlan(req, res))

planRouter.delete("/:id", (req, res) => planPresentation.deletePlan(req, res))
