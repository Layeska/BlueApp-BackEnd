import express from "express";
import http from "http";
import { initSocketServer } from "./src/utils/socketServer.js";

const app = express();
export const server = http.createServer(app);
initSocketServer(server);

