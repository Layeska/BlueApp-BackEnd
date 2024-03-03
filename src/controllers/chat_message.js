import { ChatMessage } from "../models/chat_message.js";
import { io } from "../utils/socketServer.js";

function send(req, res) {
    const { chat_id, message } = req.body;
    const { user_id } = req.user;

    const chat_message = new ChatMessage({
        chat: chat_id,
        user: user_id,
        message,
        type: "TEXT"
    });

    chat_message.save()
        .then(resp => {
            const data = chat_message.populate("user");
            io.Sockets.in(chat_id).emit("message", data);
            io.Sockets.in(`${chat_id}_notify`).emit("message_notify", data);

            res.status(201).send({msg: "mesaje enviado"})
        })
        .catch(error => res.status(400).send({msg: "Error ha pasado"}))
}

export const ChatMessageController = {
    send
};