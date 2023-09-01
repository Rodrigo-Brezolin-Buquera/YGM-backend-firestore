import express from "express";
import { adminTokenMW, userTokenMW } from "../../common/services/tokenMidleware";
import { ContractsBusiness } from "./business/contract.Business";
import { ContractDatabase } from "./database/contracts.Database";
import { ContractController } from "./controller/contract.Controller";

export const contractRouter = express.Router();

const db = new ContractDatabase();
const business = new ContractsBusiness(db);
const controller = new ContractController(business);

contractRouter.get("/", adminTokenMW, (req, res) => controller.findAllContracts(req, res)
);
contractRouter.get("/user", userTokenMW, (req, res) => controller.findContract(req, res));
contractRouter.get("/:id", adminTokenMW, (req, res) =>  controller.findContractById(req, res)
);

contractRouter.post("/:userId", adminTokenMW, (req, res) => controller.createContract(req, res));

contractRouter.put("/changePlan/:id", adminTokenMW, (req, res) => controller.changePlan(req, res));

contractRouter.put("/changeClasses/:id", adminTokenMW, (req, res) => controller.changeClasses(req, res) 
);

