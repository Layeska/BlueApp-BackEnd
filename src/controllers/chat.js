import { Chat } from "../models/index.js";

async function create(req, res) {
    const { participant_id_one, participant_id_two } = req.body;

    const foundOne = await Chat.findOne({
        participant_one: participant_id_one,
        participant_two: participant_id_two
    });

    const foundTwo = await Chat.findOne({
        participant_one: participant_id_two,
        participant_two: participant_id_one
    });

    if(foundOne || foundTwo) {
        res.status(200).send({ msg: "Tienes Historial de chat con usuario"});
        return;
    }

    const chat = new Chat({
        participant_one: participant_id_one,
        participant_two: participant_id_two
    });

    chat.save().then(resp => {
        res.status(201).send(resp);
    }).catch(error => res.status(400).send({ msg: `Error al crear chat: ${error}`}))
}

//Devuelve chats mios con otra persona
async function getAll(req, res) {
    const { user_id } = req.user;

    Chat.find({
        $or: [{ participant_one: user_id}, { participant_two: user_id}]
    })
    .populate("participant_one")
    .populate("participant_two")
    .exec().then(resp => res.status(200).send(resp)).catch(error => res.status(400).send({ msg: "error"}));

}

async function deleteChat(req, res) {
    const chat_id = req.params.id;

    Chat.findByIdAndDelete(chat_id).then(resp => res.status(200).send({msg: "Chat borrado exitosamente!"}))
    .catch(error => res.status(400).send({ msg: `Ha ocurrido un error ${error}`}));
}

async function getById(req, res) {
    const chat_id = req.params.id;

    Chat.findById(chat_id)
        .populate("participant_one")
        .populate("participant_two")
        .then(resp => res.status(200).send(resp))
        .catch(error => res.status(400).send({msg: "error"}));
}


export const ChatController = {
    create, getAll, deleteChat, getById
};