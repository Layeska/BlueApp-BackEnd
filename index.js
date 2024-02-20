import mongoose from "mongoose";
import { server } from "./app.js";
import { io } from "./src/utils/socketServer.js";

const PORT = process.env.PORT || 3000;
const IP_SERVER = process.env.IP_SERVER || "localhost";
const DB_USER = process.env.DB_USER || "admin";
const DB_PASSWORD = process.env.DB_PASSWORD || "VY5EBwZ6wHFW3o1d";
const DB_HOST = process.env.DB_HOST || "lueapp.cpzzgv6.mongodb.net";

const mongoDbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`;

//const mongoose = require('mongoose');

mongoose.connect(mongoDbUrl)
  .then(() => {
    server.listen(PORT, () => {
      console.log("######################");
      console.log("###### API REST ######");
      console.log("######################");
      console.log(`http://${IP_SERVER}:${PORT}/api`);

      io.sockets.on("connection", (socket) => {
        console.log("NUEVO USUARIO CONECTADO");

        socket.on("disconnect", () => {
          console.log("USUARIO DESCONECTADO");
        });

        socket.on("subscribe", (room) => {
          socket.join(room);
        });

        socket.on("unsubscribe", (room) => {
          socket.leave(room);
        });
      });
    });
  })
  .catch(error => {
    console.error("Error al conectar a la base de datos:", error);
  });


/*
mongoose.connect(mongoDbUrl, (error) => {
    if(error) throw error;

    server.listen(PORT, () => {
        console.log("**************************************");
        console.log("******* Welcome the Blue App *********");
        console.log("**************************************");
        console.log(`\nLevantado en: http://${IP_SERVER}:${PORT}/api`);

        io.sockets.on("connection", (socket) => {
            console.log("Nuevo usuario ha ingresado! 👋");

            socket.on("disconnect", () => {
                console.log("USUARIO SE HA IDO ✖️");
            });

            socket.on("subscribe", (room) => {
                socket.join(room);
            });

            socket.io("unsubscribe", (room) => {
                socket.leave(room);
            });
        });
    });
});*/
