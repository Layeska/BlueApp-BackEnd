import { Socket } from "socket.io";
import { server } from "./app.js";
import { io } from "./src/utils/socketServer.js";

const PORT = process.env.PORT || 3000;
const IP_SERVER = process.env.IP_SERVER || "localhost";

server.listen(PORT, () => {
    console.log("**************************************");
    console.log("******* Welcome the Blue App *********");
    console.log("**************************************");
    console.log(`\nOpen in: http://${IP_SERVER}/:${PORT}\n`)

    io.sockets.on("connection", (socket) => {
        console.log("Nuevo usuario ha ingresado! 👋");

        socket.on("disconnect", () => {
            console.log("USUARIO SE HA IDO ✖️");
        })

        Socket.on("subcribe", (room) => {
            socket.join(room);
        });

        socket.io("unsubscribe", (room) => {
            socket.leave(room);
        });
    });
});
