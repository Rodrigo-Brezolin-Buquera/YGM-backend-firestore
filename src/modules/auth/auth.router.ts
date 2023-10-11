import express from "express";
import { adminTokenMW } from "../../common/services/tokenMidleware";
import { TokenService } from "../../common/services/common.Token.service";
import { AuthBusiness } from "./business/auth.Business";
import { AuthDatabase } from "./database/auth.Database";
import { AuthController } from "./controller/auth.Controller";

export const authRouter = express.Router();

const db = new AuthDatabase();
const authApplication = new AuthBusiness(
  db,
  new TokenService()
);
const controller = new AuthController(authApplication);


authRouter.get("/inactive", adminTokenMW, (req, res) => controller.findInactiveUsers(req, res));

authRouter.post("/login", (req, res) => controller.login(req, res));
authRouter.post("/signup", (req, res) => controller.signup(req, res));

authRouter.delete("/:id", adminTokenMW, (req, res) => controller.deleteUser(req, res));
