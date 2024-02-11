import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { initSocketServer } from "./src/utils/socketServer.js";
import { authRoutes } from "./src/routes/index.js"

const app = express();
export const server = http.createServer(app);
initSocketServer(server);

//Configure Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// configuración de carpeta statica
app.use(express.static("./src/uploads"));

app.use(cors); //Config cors
app.use(morgan("dev")); // config http dev

//configurando route
app.use("/api", authRoutes);
