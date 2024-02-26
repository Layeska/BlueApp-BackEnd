import express from "express";
import multiparty from "connect-multiparty";
import { UserController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";

const mdUpload = multiparty({
    uploadDir: "./uploads/avatar"
});

const api = express.Router();

api.get("/user/me", [mdAuth.asureAuth], UserController.getMe);
api.get("/user", [mdAuth.asureAuth], UserController.getUsers);
api.get("/user/:id", [mdAuth.asureAuth], UserController.getUserById);

api.patch("/user/me", [mdAuth.asureAuth, mdUpload], UserController.updateUser);

export const userRoutes = api;