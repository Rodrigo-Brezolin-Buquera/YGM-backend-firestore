import express from "express";
import { IdService } from "../../../common/aplication/common.Id.service";
import { adminTokenMW, userTokenMW } from "../../../common/controller/tokenMidleware";
import { ContractsBusiness } from "../business/contract.Business";
import { ContractDatabase } from "../database/contracts.Database";
import { ContractsPresentation } from "./contract.Presentation";

export const contractsRouter = express.Router();

const idService = new IdService();

const db = new ContractDatabase();
const business = new ContractsBusiness(db, idService);
const controller = new ContractsPresentation(business);

contractsRouter.get("/list", adminTokenMW, (req, res) => controller.findAllContracts(req, res)
);
contractsRouter.get("/user", userTokenMW, (req, res) => controller.findContract(req, res));
contractsRouter.get("/:id", adminTokenMW, (req, res) =>  controller.findContractById(req, res)
);

contractsRouter.post("/", adminTokenMW, (req, res) => controller.createContract(req, res));

contractsRouter.put("/edit/:id", adminTokenMW, (req, res) => controller.editContract(req, res)
);
// contractsRouter.put("/addNew/:id", (req, res) => controller.addNewContract(req, res));
contractsRouter.put("/changeClasses/:action/:id", (req, res) => controller.changeClasses(req, res) // repensar
);

contractsRouter.delete("/:id", adminTokenMW, (req, res) => controller.deleteContract(req, res)
);
