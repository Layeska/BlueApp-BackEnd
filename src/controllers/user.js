import { User } from "../models/index.js"

async function getMe(req, res) {
    const { user_id } = req.user;

    try {
        const response = await User.findById(user_id).select(["-password"]);
        console.log("Response: ", response);

        if(!response) {
            res.status(400).send({ msg: "No se ha encontrado el usuario"});
        } else {
            res.status(200).send(response);
        }
    } catch(error) {
        res.status(500).send({ mgs: error});
    }
}

async function getUsers(req, res) {
    try {
        const { user_id } = req.user;
        const response = await User.find({ _id: { $ne: user_id}}).select(["-password"]);

        if(!response) {
            res.status(400).send({ mgs: "No se encontraron usuarios"});
        } else {
            res.status(200).send(response);
        }
    } catch(error) {
        res.status(500).send({ msg: "Error Server"});
    }
}

async function getUserById(req, res) {
    const { id } = req.params;

    try {
        const response = await User.findById(id).select(["-password"]);

        if(!response) {
            res.status(400).send({ mgs: "No se ha encontrado usuario"});
        } else {
            res.status(200).send(response);
        }
    } catch(error) {
        res.status(500).send({ mgs: "Error server"});
    }
}

async function updateUser(req, res) {
    const { user_id } = req.user;
    const userData = req.body;


    res.status(200).send({ msg: "ok"});
}


export const UserController = {
    getMe, getUsers, getUserById, updateUser
};