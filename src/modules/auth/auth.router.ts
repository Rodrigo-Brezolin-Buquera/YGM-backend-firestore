import express from "express";
import { adminTokenMW } from "../../common/services/tokenMidleware";
import { TokenService } from "../../common/services/common.Token.service";
import { AuthBusiness } from "./business/auth.Business";
import { AuthMailerService } from "./business/auth.mailer.service";
import { AuthDatabase } from "./database/auth.Database";
import { AuthController } from "./controller/auth.Controller";

export const authRouter = express.Router();

const db = new AuthDatabase();
const authApplication = new AuthBusiness(
  db,
  new TokenService(),
  new AuthMailerService()
);
const controller = new AuthController(authApplication);


authRouter.get("/inactive", adminTokenMW, (req, res) => controller.findInactiveUsers(req, res));

authRouter.post("/login", (req, res) => controller.login(req, res));
authRouter.post("/signup", (req, res) => controller.signup(req, res));

authRouter.put("/password", (req, res) => controller.changeUserPassword(req, res));
authRouter.put("/password/:id", adminTokenMW, (req, res) => controller.changePassword(req, res));

authRouter.delete("/:id", adminTokenMW, (req, res) => controller.deleteUser(req, res));
