import express from "express";
import { ContractsApplication } from "../application/Aplication";
import { ContractsInfrastructure } from "../infrastructure/Infrastructure";
import { ContractsPresentation } from "./Presentation";

 

export const contractsRouter = express.Router()

const contractsInfrastructure = new ContractsInfrastructure()
const contractsApplication = new ContractsApplication(contractsInfrastructure)
const contractsPresentation = new ContractsPresentation(contractsApplication)

contractsRouter.get("/list", (req, res) => contractsPresentation.findAllContracts(req, res))   
contractsRouter.get("/user", (req, res) => contractsPresentation.findContract(req, res))
contractsRouter.get("/:id", (req, res) => contractsPresentation.findContractById(req, res))  
 
contractsRouter.post("/create", (req, res) => contractsPresentation.createContract(req, res))

contractsRouter.put("/", (req, res) => contractsPresentation.editContract(req, res))
contractsRouter.put("/addNew", (req, res) => contractsPresentation.addNewContract(req, res))
contractsRouter.put("/planStatus", (req, res) => contractsPresentation.alterPlanStatus(req, res))

contractsRouter.delete("/:id", (req, res) => contractsPresentation.deleteContract(req, res))
