import express from "express";
import { AuthApplication } from "../application/auth.Aplication";
import { AuthInfrastructure } from "../infrastructure/auth.User.service";
import { AuthPresentation } from "./Presentation";

export const authRouter = express.Router()


const authInfrastructure = new AuthInfrastructure()
const authApplication = new AuthApplication(authInfrastructure)
const authPresentation = new AuthPresentation(authApplication)

authRouter.post("/login", (req, res) => authPresentation.login(req, res))  
authRouter.post("/createUser", (req, res) => authPresentation.createUser(req, res)) 

authRouter.delete("/:id", (req, res) => authPresentation.deleteUser(req, res)) 


