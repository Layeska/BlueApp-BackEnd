import express from "express";
import { ChatController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";

const api = express.Router();

api.get("/chat", [mdAuth.asureAuth], ChatController.getAll);
api.get("/chat/:id", [mdAuth.asureAuth], ChatController.getById);
api.post("/chat", [mdAuth.asureAuth], ChatController.create);
api.delete("/chat/:id", [mdAuth.asureAuth], ChatController.deleteChat);

export const chatRoutes = api;