import express from "express";
import TokenService from "../../../common/aplication/common.Token.service";
import { AuthApplication } from "../application/auth.Application";
import { AuthMailerService } from "../application/auth.mailTransporter.service";
import { AuthPasswordService } from "../application/auth.passwordGenerator.service";
import { AuthInfrastructure } from "../infrastructure/auth.infrastructure";
import { AuthPresentation } from "./auth.Presentation";

export const authRouter = express.Router();

const tokenService = new TokenService()
const mailerService = new AuthMailerService()
const passwordService = new AuthPasswordService()

const authInfrastructure = new AuthInfrastructure();
const authApplication = new AuthApplication(
  authInfrastructure,
  tokenService,
  mailerService,
  passwordService
);
const authPresentation = new AuthPresentation(authApplication);

authRouter.post("/login", (req, res) => authPresentation.login(req, res));
authRouter.post("/createUser", (req, res) =>
  authPresentation.createUser(req, res)
);

authRouter.put("/:id", (req, res) => authPresentation.changePassword(req, res));

authRouter.delete("/:id", (req, res) => authPresentation.deleteUser(req, res));
