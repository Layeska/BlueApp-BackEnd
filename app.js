import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { initSocketServer } from "./src/utils/index.js";
import { authRoutes, userRoutes, chatRoutes, chatMessageRoutes } from "./src/routes/index.js"

const app = express();
const server = http.createServer(app);
initSocketServer(server);

//Configure Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// configuración de carpeta statica
app.use(express.static("./src/uploads"));

app.use(cors()); // <-- Agregar paréntesis para invocar la función cors
app.use(morgan("dev")); // <-- Invocar morgan con el parámetro "dev" para mostrar el log en el desarrollo


//configurando route
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", chatRoutes);
app.use("/api", chatMessageRoutes);

export { server };