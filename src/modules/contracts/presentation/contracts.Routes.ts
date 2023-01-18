import express from "express";
import { DateService } from "../../../common/aplication/common.Dates.service";
import { IdService } from "../../../common/aplication/common.Id.service";
import { TokenService } from "../../../common/aplication/common.Token.service";
import { ContractsApplication } from "../application/contracts.Application";
import { ContractsRequestService } from "../application/contracts.requests.service";
import { ContractsInfrastructure } from "../infrastructure/contracts.Infrastructure";
import { ContractsPresentation } from "./contract.Presentation";

export const contractsRouter = express.Router();

const tokenService = new TokenService();
const idService = new IdService();
const dataService = new DateService();
const requestService = new ContractsRequestService();

const contractsInfrastructure = new ContractsInfrastructure();
const contractsApplication = new ContractsApplication(
  contractsInfrastructure,
  tokenService,
  idService,
  dataService,
  requestService
);
const contractsPresentation = new ContractsPresentation(contractsApplication);

contractsRouter.get("/list", (req, res) =>
  contractsPresentation.findAllContracts(req, res)
);
contractsRouter.get("/user", (req, res) =>
  contractsPresentation.findContract(req, res)
);
contractsRouter.get("/:id", (req, res) =>
  contractsPresentation.findContractById(req, res)
);

contractsRouter.post("/", (req, res) =>
  contractsPresentation.createContract(req, res)
);

contractsRouter.put("/edit/:id", (req, res) =>
  contractsPresentation.editContract(req, res)
);
contractsRouter.put("/addNew/:id", (req, res) =>
  contractsPresentation.addNewContract(req, res)
);
contractsRouter.put("/changeClasses/:action/:id", (req, res) =>
  contractsPresentation.changeClasses(req, res)
);

contractsRouter.delete("/:id", (req, res) =>
  contractsPresentation.deleteContract(req, res)
);
