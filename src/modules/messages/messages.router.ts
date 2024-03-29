import express from "express";
import { adminTokenMW, userTokenMW } from "../../common/services/tokenMidleware";
import { MessagesBusiness } from "./business/messages.Business";
import { MesssagesController } from "./controller/messages.Controller";
import { MessagesDatabase } from "./database/messages.database";

export const messagesRouter = express.Router()

const db = new MessagesDatabase()
const business = new MessagesBusiness(db)
const controller = new MesssagesController(business)

messagesRouter.get("/:id", userTokenMW,  (req, res) => controller.find(req, res))  
messagesRouter.put("/:id", adminTokenMW, (req, res) => controller.edit(req, res))

