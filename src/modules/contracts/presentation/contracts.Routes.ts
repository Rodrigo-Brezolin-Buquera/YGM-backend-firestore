import express from "express";
import { ContractsApplication } from "../application/contracts.Application";
import { ContractsInfrastructure } from "../infrastructure/contracts.Infrastructure";
import { ContractsPresentation } from "./contract.Presentation";

export const contractsRouter = express.Router()

const contractsInfrastructure = new ContractsInfrastructure()
const contractsApplication = new ContractsApplication(contractsInfrastructure)
const contractsPresentation = new ContractsPresentation(contractsApplication)

contractsRouter.get("/list", (req, res) => contractsPresentation.findAllContracts(req, res))   
contractsRouter.get("/user", (req, res) => contractsPresentation.findContract(req, res))
contractsRouter.get("/:id", (req, res) => contractsPresentation.findContractById(req, res))  
 
contractsRouter.post("/", (req, res) => contractsPresentation.createContract(req, res))

contractsRouter.put("/edit/:id", (req, res) => contractsPresentation.editContract(req, res))
contractsRouter.put("/addNew/:id", (req, res) => contractsPresentation.addNewContract(req, res))

contractsRouter.delete("/:id", (req, res) => contractsPresentation.deleteContract(req, res))
