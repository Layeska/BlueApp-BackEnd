import express from "express";
import { AuthController } from "../controllers/index.js";
import {mdAuth} from "../middlewares/index.js"

const api = express.Router();

api.post("/auth/register", AuthController.register);
api.post("/auth/login", AuthController.login);
api.post("/auth/refesh-access-token", AuthController.refreshAccessToken);

api.get("/auth/test-md", [mdAuth.asureAuth], (req, res) => {
    console.log("datos autoh: ", req.user);
    res.status(200).send({ msg: "todo ok"});
})


export const authRoutes = api;
