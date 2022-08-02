import express from "express";
import { AuthApplication } from "../application/auth.Application";
import { AuthInfrastructure } from "../infrastructure/auth.infrastructure";
import { AuthPresentation } from "./auth.Presentation";

export const authRouter = express.Router()


const authInfrastructure = new AuthInfrastructure()
const authApplication = new AuthApplication(authInfrastructure)
const authPresentation = new AuthPresentation(authApplication)

authRouter.post("/login", (req, res) => authPresentation.login(req, res))  
authRouter.post("/createUser", (req, res) => authPresentation.createUser(req, res)) 

authRouter.put("/:id", (req, res) => authPresentation.changePassword(req, res)) 

authRouter.delete("/:id/:token", (req, res) => authPresentation.deleteUser(req, res)) 


