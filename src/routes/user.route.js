import express from "express";
import { UserController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";
import multipart from "connect-multiparty";

const mdUpload = multipart({ uploadDir: "../uploads/"});

const api = express.Router();

api.get("/user/me", [mdAuth.asureAuth], UserController.getMe);
api.get("/user", [mdAuth.asureAuth], UserController.getUsers);
api.get("/user/:id", [mdAuth.asureAuth], UserController.getUserById);

api.patch("/user/me", [mdAuth.asureAuth, mdUpload], UserController.updateUser);

export const userRoutes = api;